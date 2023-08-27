import { CircleLoader } from "react-spinners";

const LoaderStart = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "40px",
        // height: "100vh",
      }}
    >
      <CircleLoader color="#d3a863" size={280} />
    </div>
  );
};

export default LoaderStart;
