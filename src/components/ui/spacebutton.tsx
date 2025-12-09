import { ArrowRightFromLineIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Image from "next/image";

const SpaceStrip = () => {
  return (
    <StyledWrapper>
      <Link href="https://unstop.com/p/dev-o-lution-google-developer-group-on-campus-daiict-1285732">
        <div className="strip">
          <Image
            src="/chill-guy-no-bg.gif"
            unoptimized
            alt="chill-guy"
            className="astronaut"
            width={500}
            height={500}
          />
          <strong>Registrations are closed! </strong>
          <ArrowRightFromLineIcon className="text-white h-4 shadow-md" />
          <div id="container-stars">
            <div id="stars" />
          </div>
          <div id="glow">
            <div className="circle" />
            <div className="circle" />
          </div>
        </div>
      </Link>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .strip {
    position: fixed;
    top: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1.75rem;
    width: 100%;
    background-size: 300% 300%;
    animation: gradient_301 5s ease infinite;
    backdrop-filter: blur(1rem);
    // border-radius: 0 0 1rem 1rem;
    // border: double 4px transparent;
    background-image: linear-gradient(#212121, #212121),
      linear-gradient(
        137.48deg,
        #ffdb3b 10%,
        #fe53bb 45%,
        #8f51ea 67%,
        #0044ff 87%
      );
    background-origin: border-box;
    background-clip: content-box, border-box;
    cursor: pointer;
    transition: 0.5s;
  }

  strong {
    z-index: 2;
    font-size: 12px;
    letter-spacing: 2px;
    color: #ffffff;
    // text-shadow: 0 0 2px white;
  }

  #container-stars {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: 0.5s;
    backdrop-filter: blur(1rem);
    // border-radius: 0 0 1rem 1rem;
  }

  #stars {
    position: relative;
    background: transparent;
    width: 200rem;
    height: 200rem;
  }

  #stars::after {
    content: "";
    position: absolute;
    top: -10rem;
    left: -100rem;
    width: 100%;
    height: 100%;
    animation: animStarRotate 90s linear infinite;
  }

  #stars::after {
    background-image: radial-gradient(#ffffff 1px, transparent 1%);
    background-size: 50px 50px;
  }

  #stars::before {
    content: "";
    position: absolute;
    top: 0;
    left: -50%;
    width: 170%;
    height: 500%;
    animation: animStar 60s linear infinite;
  }

  #stars::before {
    background-image: radial-gradient(#ffffff 1px, transparent 1%);
    background-size: 50px 50px;
    opacity: 0.5;
  }

  #glow {
    position: absolute;
    display: flex;
    width: 12rem;
  }

  .circle {
    width: 100%;
    height: 30px;
    filter: blur(2rem);
    animation: pulse_3011 4s infinite;
    z-index: -1;
  }

  .circle:nth-of-type(1) {
    background: rgba(254, 83, 186, 0.636);
  }

  .circle:nth-of-type(2) {
    background: rgba(142, 81, 234, 0.704);
  }

  @keyframes animStar {
    from {
      transform: translateY(0);
    }

    to {
      transform: translateY(-135rem);
    }
  }

  @keyframes animStarRotate {
    from {
      transform: rotate(360deg);
    }

    to {
      transform: rotate(0);
    }
  }

  @keyframes gradient_301 {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes pulse_3011 {
    0% {
      transform: scale(0.75);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }

    100% {
      transform: scale(0.75);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }

  .astronaut {
    position: absolute;
    left: -10%;
    top: 50%;
    transform: translateY(-50%) rotate(270deg) scaleY(-1);
    width: 50px;
    animation: moveAstronaut 10s linear infinite;
  }

  @keyframes moveAstronaut {
    0% {
      left: -10%;
    }
    100% {
      left: 110%;
    }
  }

  @media (max-width: 768px) {
    .astronaut {
      animation: moveAstronaut 4s linear infinite;
    }
  }
`;

export default SpaceStrip;
