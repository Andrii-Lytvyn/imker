import styles from "./AboutUs.module.css";

export default function AboutUs(): JSX.Element {

    return (
        <>
            <div className={styles.title_container}>
                <div className={styles.title}>
                    <span>ABOUT US</span>
                </div>
            </div>

            <div className={styles.description_container}>
                <div className={styles.description_right_and_left}>
                    <div className={styles.description_left}>
                        <div className={styles.left_top}>
                            <p> Left block. WHAT ARE HONEYBEES </p>
                        </div>
                        <div className={styles.left_img}>
                            <img className={styles.description_left_img} src="../public/img/bee.jpg"/>
                        </div>
                        <div className={styles.left_bottom}>
                            <p> Left block. Bottom. Text. </p>
                        </div>
                    </div>
                    <div className={styles.description_right}>
                        <div className={styles.description_right_top}>
                            <p> Right block. Text top
                                <br />
                                Lorem ipsum dolor sit amet, ad nec scripta volumus,
                                eu viris salutatus dissentias sit, ex enim Duo magna
                                nostro persequeris ne Eam tritani maiorum ne, quod
                                ne legere quodsi phaedrum ad per, in malis.
                            </p>
                        </div>
                        <div className={styles.description_right_middle_img}>
                            <div>
                                <img className={styles.description_img} src="../public/img/bee.jpg" />
                            </div>
                            <div>
                                <img className={styles.description_img} src="../public/img/bee.jpg"  />
                            </div>
                        </div>
                        <div className={styles.description_right_bottom}>
                            <p> Right block. Text bottom
                                <br /><br />
                                Ponderum consulatu cum te Lorem ipsum Vel ad falli
                                graecis copiosae, solum integre fastidii sea cu. Melius
                                insolens constituto ad pri, numquam accommodare eu nec.
                                Pro ad wisi altera forensibus. Et pri nemore nomina </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.team_container}>
                    <div className={styles.team_title}>
                        <div className={styles.title}>
                            <h2>OUR TEAM</h2><br/>
                        </div>
                        <div>
                            <p>Text .... Meet our team and so on</p>
                        </div>
                    </div>
                    <div className={styles.members}>

                        <div className={styles.member1}>
                            <div>
                            <img className={styles.memeber_img} src="../public/img/beeboss.jpg" />
                            </div>
                            <div>
                            <p> Members 1 Position</p>
                            </div>
                            <div>
                            <p> Members 1 Name</p>
                            </div>
                            <div>
                            <p> Members 1 Description</p>
                            </div>
                            <div className={styles.members_networks}>
                            <p> Members 1 Facebook</p>
                            <p> Members 1 Instagramm</p>
                            <p> Members 1 Email</p>                         
                            </div>
                        </div>

                        <div className={styles.member}>
                            <img className={styles.memeber_img} src="../public/img/beeboss.jpg" />
                            <p> Members 2 </p>
                        </div>
                        <div className={styles.member}>
                            <img className={styles.memeber_img} src="../public/img/beeboss.jpg" />
                            <p> Members 3 </p>
                        </div>
                    </div>
            </div>
        </>
    );
}
