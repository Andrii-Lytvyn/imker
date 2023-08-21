import { DotSpinner } from "@uiball/loaders";
// import { RingLoader } from "react-spinners";

// const Loader = (): JSX.Element => {
//   return <RingLoader color="#d3a863" size={180} />;
// };

// export default Loader;

const Loader = (): JSX.Element => {
  return <DotSpinner size={50} speed={0.9} color="#d3a863" />;
};

export default Loader;
