import axios from "axios";
import { useEffect, useState } from "react";
import { IMember } from "./IMembers";


export default function AboutUs(): JSX.Element {

    const [member, setMember] = useState<IMember[]>([]);
    console.log("🚀 ~ file: AboutUs.tsx:9 ~ AboutUs ~ member:", member)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/members");
                const memberDto = await response.data;
                setMember(memberDto.members);
                console.log("🚀 ~ file: AboutUs.tsx:28 ~ fetchData ~ memberDto:", memberDto)
            } catch (error) {
                console.error("Error during request execution:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div>
                <div>
                    <span>ABOUT US</span>
                </div>
            </div>
            <div>
                <div>
                    <div>
                        <p> Left block top. WHAT ARE HONEYBEES </p>
                    </div>
                    <div>
                        <img src="" />
                    </div>
                    <div>
                        <p> Left block. Bottom. Text. </p>
                    </div>
                </div>
                <div>
                    <div>
                        <p> Right block. Text top
                            <br />
                            Lorem ipsum dolor sit amet, ad nec scripta volumus,
                            eu viris salutatus dissentias sit, ex enim Duo magna
                            nostro persequeris ne Eam tritani maiorum ne, quod
                            ne legere quodsi phaedrum ad per, in malis.
                        </p>
                    </div>
                    <div>
                        <div>
                            <img src="" />
                        </div>
                        <div>
                            <img src="" />
                        </div>
                    </div>
                    <div>
                        <p> Right block. Text bottom
                            <br /><br />
                            Ponderum consulatu cum te Lorem ipsum Vel ad falli
                            graecis copiosae, solum integre fastidii sea cu. Melius
                            insolens constituto ad pri, numquam accommodare eu nec.
                            Pro ad wisi altera forensibus. Et pri nemore nomina </p>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <div>
                        <h2>OUR TEAM</h2><br />
                    </div>
                    <div>
                        <p>Text .... Meet our team and so on</p>
                    </div>
                </div>
                <div>
                    <ul>
                        {member?.map((element, index) => (
                            element.state === "SHOW" ?
                                <li key={index}>
                                    <div>
                                        <div>
                                            <img src={element.image} />
                                        </div>
                                        <div>
                                            <p>{element.position}</p>
                                        </div>
                                        <div>
                                            <p> {element.name}</p>
                                        </div>
                                        <div>
                                            <p>{element.description}</p>
                                        </div>
                                        <div>
                                            <a href={element.facebook}> Facebook </a>
                                            <a href={element.instagram}> Instagramm </a>
                                            <a href={element.email}> Email </a>
                                        </div>
                                    </div>
                                </li>
                                : ""
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
