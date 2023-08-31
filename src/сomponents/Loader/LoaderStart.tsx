// import { CircleLoader } from "react-spinners";

const LoaderStart = () => {
  return (
    // <div
    //   style={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     marginTop: "40px",
    //     // height: "100vh",
    //   }}
    // >
    //   <CircleLoader color="#d3a863" size={280} />
    // </div>
    <img
      style={{
        position: "absolute",
        top: "25%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      src="/img/preloader.gif"
      alt="loader"
    />
  );
};

export default LoaderStart;
