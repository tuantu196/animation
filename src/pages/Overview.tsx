import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Overview() {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const listRefs = useRef<HTMLLIElement[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const listGroupRefs = useRef<(HTMLUListElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: -30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );

        // Hover animation cho <h1>
        const h1 = headerRef.current;
        h1.addEventListener("mouseenter", () => {
          gsap.to(h1, { scale: 1.1, duration: 0.3, ease: "power2.out" });
        });
        h1.addEventListener("mouseleave", () => {
          gsap.to(h1, { scale: 1, duration: 0.3, ease: "power2.out" });
        });
      }

      // Link/Description animation
      if (linkRef.current) {
        gsap.fromTo(
          linkRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.2,
            scrollTrigger: {
              trigger: linkRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );

        // Hover animation cho <a>
        const a = linkRef.current;
        a.addEventListener("mouseenter", () => {
          gsap.to(a, { scale: 1.05, duration: 0.3, ease: "power2.out" });
        });
        a.addEventListener("mouseleave", () => {
          gsap.to(a, { scale: 1, duration: 0.3, ease: "power2.out" });
        });
      }

      // Images animation
      imageRefs.current.forEach((img) => {
        if (img) {
          gsap.fromTo(
            img,
            { opacity: 0, scale: 0.8, y: 40 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: img,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });

      // List groups animation (stagger)
      listGroupRefs.current.forEach((ul, groupIndex) => {
        if (ul) {
          const items = Array.from(ul.children) as HTMLElement[];
          gsap.fromTo(
            items,
            {
              opacity: 0,
              x: groupIndex % 2 === 0 ? -50 : 50,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              ease: "power2.out",
              stagger: 0.15,
              scrollTrigger: {
                trigger: ul,
                start: "top 75%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });

      // Individual list items hover (for the first list group)
      listRefs.current.forEach((li) => {
        if (li) {
          li.addEventListener("mouseenter", () => {
            gsap.to(li, { scale: 1.03, y: -4, duration: 0.3, ease: "power2.out" });
          });
          li.addEventListener("mouseleave", () => {
            gsap.to(li, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "48px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
        }}
      >
        <h1
          ref={headerRef}
          style={{
            display: "inline-block",
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#ffffff",
            margin: 0,
            textAlign: "center",
          }}
        >
          Overview
        </h1>
        <a
          ref={linkRef}
          style={{
            display: "block",
            margin: "0",
            fontSize: "1.125rem",
            lineHeight: "1.6",
            color: "#f3f4f6",
            textAlign: "center",
            maxWidth: "800px",
            padding: "16px 24px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
            backdropFilter: "blur(10px)",
          }}
        >
          When elements change their state or position, the duration of the
          animation should be slow enough to notice, but quick enough not to
          wait.
        </a>
        <img
          ref={(el) => {
            imageRefs.current[0] = el;
          }}
          src="https://cdn.dribbble.com/userupload/22948371/file/original-fa4e1e32c67aff3c76950b64acab035b.gif"
          alt="Overview Image"
          width={600}
          height={400}
          style={{
            display: "block",
            maxWidth: "100%",
            height: "auto",
            borderRadius: "16px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
          }}
        />
        <ul
          ref={(el) => {
            listGroupRefs.current[0] = el;
          }}
          className="flex flex-col"
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            width: "100%",
            maxWidth: "800px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {[
            "Numerous researches have discovered that optimal speed for interface animation is between 200 and 500 ms.",
            "Any animation shorter than 100 ms is instantaneous and won't be recognized at all.",
            "Whereas the animation longer than 1 second would convey a sense of delay and be boring for the user.",
          ].map((text, i) => (
            <li
              key={i}
              ref={(el) => {
                if (el) listRefs.current[i] = el;
              }}
              style={{
                marginBottom: 0,
                display: "block",
                padding: "20px 24px",
                background: "rgba(255, 255, 255, 0.95)",
                borderRadius: "12px",
                fontSize: "1rem",
                lineHeight: "1.6",
                color: "#1f2937",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              {text}
            </li>
          ))}
        </ul>
        <img
          ref={(el) => {
            imageRefs.current[1] = el;
          }}
          src="https://cdn.dribbble.com/userupload/22995222/file/original-ed9c2b2e8c850ee682c03566b1591404.gif"
          alt="Overview Image"
          width={600}
          height={400}
          style={{
            display: "block",
            maxWidth: "100%",
            height: "auto",
            borderRadius: "16px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
          }}
        />
        <ul
          ref={(el) => {
            listGroupRefs.current[1] = el;
          }}
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            width: "100%",
            maxWidth: "800px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <li
            style={{
              padding: "20px 24px",
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "12px",
              fontSize: "1rem",
              lineHeight: "1.6",
              color: "#1f2937",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            On the mobile devices, Material Design Guidelines also suggests
            limiting the duration of animation to 200–300 ms.
          </li>
          <li
            style={{
              padding: "20px 24px",
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "12px",
              fontSize: "1rem",
              lineHeight: "1.6",
              color: "#1f2937",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            As for tablets, the duration should be longer by 30% — around
            400–450 ms. The reason is simple: the size of the screen is bigger
            so objects overcome the longer path when they change position.
          </li>
          <li
            style={{
              padding: "20px 24px",
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "12px",
              fontSize: "1rem",
              lineHeight: "1.6",
              color: "#1f2937",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            On wearables, the duration should be accordingly 30% shorter —
            around 150–200 ms, because on a smaller screen the distance to travel
            is shorter.
          </li>
        </ul>
        <img
          ref={(el) => {
            imageRefs.current[2] = el;
          }}
          src="https://miro.medium.com/v2/resize:fit:2000/format:webp/1*Y8rkOqXxLGMTk_jiZ446NA.gif"
          alt="Overview Image"
          width={600}
          height={400}
          style={{
            display: "block",
            maxWidth: "100%",
            height: "auto",
            borderRadius: "16px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
          }}
        />
        <ul
          ref={(el) => {
            listGroupRefs.current[2] = el;
          }}
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            width: "100%",
            maxWidth: "800px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <li
            style={{
              padding: "20px 24px",
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "12px",
              fontSize: "1rem",
              lineHeight: "1.6",
              color: "#1f2937",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            Web animation is treated in a different way.
          </li>
          <li
            style={{
              padding: "20px 24px",
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "12px",
              fontSize: "1rem",
              lineHeight: "1.6",
              color: "#1f2937",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            Since we are accustomed to an almost instant opening of web-pages in
            a browser, we expect to transit between different states quickly as
            well.
          </li>
          <li
            style={{
              padding: "20px 24px",
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "12px",
              fontSize: "1rem",
              lineHeight: "1.6",
              color: "#1f2937",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            So, the duration of web transitions should last about 2 times
            shorter than on mobile devices — between 150–200 ms. In other cases,
            the user will inevitably think that the computer freezes or has
            troubles with the internet connection.
          </li>
          <li
            style={{
              padding: "20px 24px",
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "12px",
              fontSize: "1rem",
              lineHeight: "1.6",
              color: "#1f2937",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            But. Forget about these rules if you are creating a decorative
            animation on your website or trying to attract the user's attention
            to certain elements. In these cases, animation can be longer.
          </li>
        </ul>
        <img
          ref={(el) => {
            imageRefs.current[3] = el;
          }}
          src="https://miro.medium.com/v2/resize:fit:2000/format:webp/1*DxZt_f4NeSmhylm7aWh0ZQ.gif"
          alt="Overview Image"
          width={600}
          height={400}
          style={{
            display: "block",
            maxWidth: "100%",
            height: "auto",
            borderRadius: "16px",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
          }}
        />
      </div>
    </div>
  );
}
