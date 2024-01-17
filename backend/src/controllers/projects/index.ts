import db from '../../config/db-config';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await db('projects').select('*').from('projects');
    res.status(StatusCodes.OK).send(projects);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

export const getProject = async (req: Request, res: Response) => {
  const { project_id } = req.params;
  try {
    const project = await db.select('*').from('projects').where({ id: project_id }).first();
    if (!project) {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Project not found' });
      return;
    }
    res.status(StatusCodes.OK).json(project);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

export const createProjectAndInviteUsers = async (req: Request, res: Response) => {
  try {
    const { title, description, thumbnail_link, date_of_creation, user_uid } = req.body;
    const { uids } = req.body;
    if (!title || !user_uid) {
      return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Invalid project data' });
    }

    const result = await db.transaction(async (trx) => {
      const [newProject] = await trx('projects')
        .insert({
          title,
          description,
          thumbnail_link,
          date_of_creation,
          user_uid,
        })
        .returning('*');

      const project_id = newProject.id;
      if (uids && uids.length) {
        for (const uid of uids) {
          await trx('project_user_relation').insert({
            project_id,
            user_uid: uid,
          });
        }
      }
      return newProject;
    });

    res.status(StatusCodes.CREATED).json(result);
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

export const getProjectsOfUser = async (req: Request, res: Response) => {
  const { user_uid } = req.params;
  try {
    const projects = await db('projects')
      .select('projects.*')
      .leftJoin('project_user_relation', 'projects.id', 'project_user_relation.project_id')
      .where('project_user_relation.user_uid', user_uid);
    res.status(StatusCodes.OK).send(projects);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

export const getAmountOfTasks = async (req: Request, res: Response) => {
  const { project_id } = req.params;
  try {
    const projects = await db('tasks').count('* as tasks_count').where('project_id', project_id);
    const completed = await db('tasks')
      .count('* as tasks_count')
      .where('project_id', project_id)
      .where('completed', true);

    if (projects.length > 0 && 'tasks_count' in projects[0]) {
      const taskCount = {
        total: projects[0].tasks_count,
        completed: completed[0].tasks_count,
      };
      res.status(StatusCodes.OK).send(taskCount);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: `No tasks found` });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

export const getUsersOfProject = async (req: Request, res: Response) => {
  const { project_id } = req.params;
  try {
    const projectUsers = await db('project_user_relation')
      .select('*')
      .where('project_id', project_id);
    res.status(StatusCodes.OK).send(projectUsers);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};
