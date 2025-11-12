import MotionBall from "../components/MotionBall";

type AnimationPageProps = {
  onBack: () => void;
};

export default function AnimationPage({ onBack }: AnimationPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Bounce & Elastic</h1>
      <p className="mb-4 text-gray-700">
        Hai easing phi tuyến phổ biến mô phỏng vật lý bật nảy và đàn hồi.
      </p>
      <MotionBall label="Bounce" color="pink" duration={2} easing="bounce.out" />
      <MotionBall label="Elastic" color="purple" duration={2} easing="elastic.out(1,0.3)" />

      <button
        onClick={onBack}
        className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Back
      </button>
    </div>
  );
}
