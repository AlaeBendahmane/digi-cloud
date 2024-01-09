import animation from "./animation.json";
import Lottie from "lottie-react";
function Loading() {
  return (
    <div className=" flex h-screen flex-col items-center justify-center ">
      <Lottie animationData={animation} loop={true} className=" h-1/2" />
    </div>
  );
}
export default Loading;