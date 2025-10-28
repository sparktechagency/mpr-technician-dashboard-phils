import { FadeLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className=" isolate aspect-video h-screen bg-primary-color/10 backdrop-blur-lg w-full flex justify-center items-center">
      <FadeLoader color="#fff" />
    </div>
  );
};

export default Loading;
