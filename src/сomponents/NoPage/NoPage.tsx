import styles from "./NoPage.module.css";
import { Link } from "react-router-dom";

export default function NoPage(): JSX.Element {
  return (
    <>
      <div className={styles.noPage}>
        <div
          className={
            styles.pageTop +
            " d-flex flex-column justify-content-center align-items-center"
          }
        >
          <h4>404</h4>
          <p>
            Leider wurde die angeforderte Seite nicht gefunden. Möglicherweise sind Sie irrtümlich einem Link gefolgt oder die Ressource wurde gelöscht. Versuchen Sie, die Hauptseite aufzurufen
          </p>
          <Link to="/imker">Hauptseite</Link>
        </div>
      </div>
    </>
  );
}
