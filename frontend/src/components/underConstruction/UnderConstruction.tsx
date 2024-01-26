import { Link } from 'react-router-dom';
import styles from './underConstruction.module.css';

const UnderConstruction = () => {
  return (
    <div className={styles.construction}>
      <div className={styles.container}>
        <img src='/assets/images/in-progress.svg' className={styles.construction_img} />
        <h1>This Page Is Under Construction</h1>
        <p className={styles.paragraph}>
          Our team is hard at work on this page, making it even better for you. In the meantime,
          please explore our{' '}
          <Link to={'/project'} className={styles.link}>
            project page
          </Link>{' '}
          and check back soon for exciting updates and improvements.{' '}
        </p>
      </div>
    </div>
  );
};

export default UnderConstruction;
