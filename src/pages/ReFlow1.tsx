import { useLayoutEffect, useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function AnimationComparison() {
  const refReflow = useRef<HTMLDivElement>(null);
  const refGSAP = useRef<HTMLDivElement>(null);

  // --- 1. Phương pháp TỐI ƯU (GSAP / Transform) ---
  useLayoutEffect(() => {
    const box = refGSAP.current;
    if (box) {
      gsap.to(box, {
        // Tối ưu: Sử dụng transform: translateX()
        x: 400,
        duration: 2,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });
    }
  }, []);

  // --- 2. Phương pháp KÉM TỐI ƯU (Reflow / Margin-left) ---
  useEffect(() => {
    const box = refReflow.current;
    if (!box) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 giây
    let direction = 1; // 1: đi sang phải, -1: đi sang trái

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;

      let distance = 0;
      if (direction === 1) {
        // Chuyển động đi (0% -> 100%)
        distance = progress * 400;
      } else {
        // Chuyển động quay lại (100% -> 0%)
        distance = 400 - progress * 400;
      }

      // Kém tối ưu: Thay đổi thuộc tính margin-left (Gây Layout/Reflow)
      box.style.marginLeft = `${distance}px`;

      // Đảo chiều sau mỗi chu kỳ 2s
      if (elapsed >= duration) {
        startTime = timestamp; // Đặt lại thời gian bắt đầu
        direction = direction * -1; // Đảo hướng
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>So Sánh Hiệu Suất Animation</h1>

      {/* Container Reflow */}
      <div
        style={{
          marginBottom: 30,
          borderBottom: "1px solid #ccc",
          paddingBottom: 20,
        }}
      >
        <h2>❌ Gây Reflow/Layout (Sử dụng margin-left)</h2>
        <p>
          Mặc dù dùng rAF, thay đổi **margin-left** buộc trình duyệt phải tính
          toán lại bố cục toàn bộ trang (Reflow) trên mỗi khung hình, gây lag.
        </p>
        <div
          ref={refReflow}
          style={{
            width: 50,
            height: 50,
            backgroundColor: "#ef4444", // Đỏ
            borderRadius: 8,
          }}
        ></div>
      </div>

      {/* Container GSAP */}
      <div>
        <h2>✅ Tối ưu (Sử dụng GSAP / transform: translateX)</h2>
        <p>
          GSAP sử dụng **transform**, cho phép GPU xử lý mà không gây Reflow,
          dẫn đến hiệu suất cao và mượt mà hơn.
        </p>
        <div
          ref={refGSAP}
          style={{
            width: 50,
            height: 50,
            backgroundColor: "#22c55e", // Xanh lá
            borderRadius: 8,
          }}
        ></div>
      </div>
    </div>
  );
}
