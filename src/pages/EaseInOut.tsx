export default function EaseInOut() {
  return (
    <div>
      <h1>EaseInOut</h1>
      <p>
        Ease-in-out is used when the objects move from one part of the screen to
        another. In such case, animation avoids the eye-catching and dramatic
        effect.
      </p>
      <img
        src="https://miro.medium.com/v2/resize:fit:2000/format:webp/1*KqmmTPRYzi17RlJRITL9zg.gif"
        alt="Overview Image"
        width={600}
        height={400}
        style={{ display: "block" }}
      />
      <p>
        Theo Nguyên tắc thiết kế Material Design, tốt hơn nên sử dụng đường cong
        bất đối xứng để làm cho chuyển động trông tự nhiên hơn và thực tế hơn.
        Sự kết thúc của đường cong phải được nhấn mạnh hơn điểm bắt đầu của nó,
        do đó thời gian tăng tốc ngắn hơn tốc độ chậm lại. Trong trường hợp này,
        người dùng sẽ chú ý nhiều hơn đến chuyển động cuối cùng của đối tượng và
        đến trạng thái mới của nó.
      </p>
      <img
        src="https://miro.medium.com/v2/resize:fit:2000/format:webp/1*pL9MBAJoFlVsOPh6K0Bucg.gif"
        alt="Overview Image"
        width={600}
        height={400}
        style={{ display: "block" }}
      />
    </div>
  );
}
