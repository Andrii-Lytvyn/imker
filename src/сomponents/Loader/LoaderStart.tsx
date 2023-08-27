import { CircleLoader } from "react-spinners";

const LoaderStart = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircleLoader color="#d3a863" size={380} />
    </div>
  );
};

export default LoaderStart;
