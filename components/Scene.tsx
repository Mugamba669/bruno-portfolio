"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/*
 * Systems & Signal — a scroll-driven story in six chapters.
 * One particle system morphs between formations as the visitor scrolls:
 *   0 SIGNAL        telemetry waves — every product starts as noise
 *   1 FOUNDATIONS   three orbital shells — UI / API / Infra
 *   2 THE LATTICE   ordered cubic grid — tools in order
 *   3 THE CLIMB     rising double helix — five years of shipping
 *   4 CONSTELLATION six orbiting clusters — six live systems
 *   5 THE BEACON    convergence + light beam — signal found
 */

const SECTION_IDS = ["about", "skills", "experience", "projects", "contact"];

/* shared mutable state — written by window listeners, read in useFrame */
const pointerState = { x: 0, y: 0 };

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uChapter;
  uniform vec2 uMouse;
  uniform float uCount;
  uniform float uCols;
  attribute float aSeed;
  attribute float aT;
  varying float vGlow;
  varying float vAlpha;

  vec2 rot2(vec2 v, float a) {
    float c = cos(a), s = sin(a);
    return vec2(v.x * c - v.y * s, v.x * s + v.y * c);
  }

  void main() {
    float idx = aT * uCount;
    float t = uTime * 0.55;
    float ra = uTime * 0.06;

    float w0 = clamp(1.0 - abs(uChapter - 0.0), 0.0, 1.0);
    float w1 = clamp(1.0 - abs(uChapter - 1.0), 0.0, 1.0);
    float w2 = clamp(1.0 - abs(uChapter - 2.0), 0.0, 1.0);
    float w3 = clamp(1.0 - abs(uChapter - 3.0), 0.0, 1.0);
    float w4 = clamp(1.0 - abs(uChapter - 4.0), 0.0, 1.0);
    float w5 = clamp(1.0 - abs(uChapter - 5.0), 0.0, 1.0);

    /* CH0 — SIGNAL: telemetry sea */
    float ix = mod(idx, uCols);
    float iz = floor(idx / uCols);
    float rows = uCount / uCols;
    vec3 p0 = vec3(
      (ix / (uCols - 1.0) - 0.5) * 26.0,
      -3.1,
      (iz / (rows - 1.0) - 0.5) * 16.0
    );
    float wave =
      sin(p0.x * 0.55 + t) * 0.45 +
      sin(p0.z * 0.8 - t * 0.7) * 0.35 +
      sin((p0.x + p0.z) * 0.32 + t * 0.45) * 0.5;
    float d = distance(p0.xz, uMouse);
    float ripple = exp(-d * 0.45) * sin(d * 2.2 - uTime * 2.4) * 0.9;
    p0.y += wave + ripple;

    /* CH1 — FOUNDATIONS: three tilted orbital rings (UI / API / Infra) */
    float shell = floor(fract(aSeed * 2.999) * 3.0);
    float r1 = 1.7 + shell * 0.75 + (fract(aSeed * 9.31) - 0.5) * 0.3;
    float th = aT * 6.28318 * 3.0 + ra * 2.0 + shell * 2.1;
    float ph = acos(2.0 * fract(aSeed * 7.91) - 1.0);
    vec3 p1 = vec3(cos(th) * r1, (fract(aSeed * 17.3) - 0.5) * 0.18, sin(th) * r1);
    float tiltX = shell * 1.05 - 1.05 + sin(ra) * 0.15;
    float tiltZ = shell * 0.7 - 0.35;
    p1.yz = rot2(p1.yz, tiltX);
    p1.xy = rot2(p1.xy, tiltZ);
    p1.y += 0.2;

    /* CH2 — THE LATTICE: ordered grid */
    float S = floor(pow(uCount, 1.0 / 3.0) + 0.5);
    float lx = mod(idx, S);
    float ly = mod(floor(idx / S), S);
    float lz = floor(idx / (S * S));
    vec3 p2 = (vec3(lx, ly, lz) / (S - 1.0) - 0.5) * vec3(8.5, 5.2, 5.0);
    p2.y += sin(uTime * 0.8 + lx * 0.7) * 0.06 + 0.2;
    p2.xz = rot2(p2.xz, ra);

    /* CH3 — THE CLIMB: double helix timeline */
    float strand = step(0.5, fract(aSeed * 5.3));
    float hAng = aT * 6.28318 * 5.0 + strand * 3.14159 + uTime * 0.25;
    float hr = 2.0 + (fract(aSeed * 9.7) - 0.5) * 0.7;
    vec3 p3 = vec3(
      cos(hAng) * hr + 2.6,
      (aT - 0.5) * 9.5,
      sin(hAng) * hr * 0.6 - 1.5
    );

    /* CH4 — CONSTELLATION: six project clusters */
    float k = floor(fract(aSeed * 11.3) * 6.0);
    float ca = k / 6.0 * 6.28318 + ra * 1.5;
    vec3 cc = vec3(cos(ca) * 3.4, sin(k * 2.1) * 1.1, sin(ca) * 2.0);
    float pa = aT * 6.28318 * 8.0 + uTime * 0.4;
    float pr = 0.5 + fract(aSeed * 6.1) * 0.3;
    vec3 p4 = cc + vec3(
      cos(pa) * pr,
      sin(pa * 1.3) * pr * 0.6,
      sin(pa) * pr
    );

    /* CH5 — THE BEACON: convergence + light beam */
    float isBeam = step(fract(aSeed * 4.7), 0.18);
    float br = 0.55 + sin(uTime * 2.2) * 0.1;
    vec3 sph = vec3(
      br * sin(ph) * cos(th * 3.0),
      br * cos(ph),
      br * sin(ph) * sin(th * 3.0)
    );
    vec3 beam = vec3(
      (fract(aSeed * 8.3) - 0.5) * 0.3,
      (aT - 0.5) * 11.0,
      (fract(aSeed * 3.9) - 0.5) * 0.3
    );
    vec3 p5 = mix(sph, beam, isBeam);
    p5.y += 0.2;

    vec3 p = p0 * w0 + p1 * w1 + p2 * w2 + p3 * w3 + p4 * w4 + p5 * w5;

    float shimmer = 0.25 + 0.75 * pow(fract(aSeed * 13.7 + uTime * 0.07), 3.0);
    float waveGlow = smoothstep(-0.9, 1.4, wave + ripple * 1.6);
    vGlow = mix(shimmer, waveGlow, w0);

    vAlpha = w0 * 1.0 + w1 * 0.85 + w2 * 0.75 + w3 * 0.9 + w4 * 0.9 + w5 * 1.2;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float size = (1.0 + aSeed * 0.9 + vGlow * 1.1) * mix(0.55, 1.0, w0);
    gl_PointSize = min(size * (95.0 / -mv.z), 15.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uCream;
  uniform vec3 uAmber;
  varying float vGlow;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float r = length(uv);
    float alpha = smoothstep(0.5, 0.24, r);
    vec3 col = mix(uCream * 0.4, uAmber, vGlow);
    gl_FragColor = vec4(col, alpha * (0.055 + vGlow * 0.22) * vAlpha);
  }
`;

function useAnchors() {
  const anchors = useRef<number[]>([0, 1, 2, 3, 4, 5]);

  useEffect(() => {
    const measure = () => {
      const tops = SECTION_IDS.map((id) => {
        const el = document.getElementById(id);
        return el ? el.offsetTop : 0;
      });
      anchors.current = [0, ...tops];
    };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 600);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  return anchors;
}

function chapterFromScroll(anchors: number[]): number {
  const s = window.scrollY + window.innerHeight * 0.55;
  for (let i = 0; i < 5; i++) {
    const a = anchors[i];
    const b = anchors[i + 1];
    if (s < b) {
      const f = Math.max(0, (s - a) / Math.max(1, b - a));
      // hold each formation pure for most of its section,
      // morph only in the final stretch as the next section approaches
      const g = Math.min(1, Math.max(0, (f - 0.55) / 0.4));
      const eased = g * g * (3 - 2 * g);
      return i + eased;
    }
  }
  return 5;
}

function StoryParticles({
  count,
  reducedMotion,
}: {
  count: number;
  reducedMotion: boolean;
}) {
  const anchors = useAnchors();

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3); // dummy — real pos in shader
    const seeds = new Float32Array(count);
    const ts = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      seeds[i] = Math.random();
      ts[i] = i / count;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    geo.setAttribute("aT", new THREE.BufferAttribute(ts, 1));
    // particles morph across the whole view — skip per-frame culling checks
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), 30);
    return geo;
  }, [count]);

  const material = useMemo(() => {
    const cols = Math.floor(Math.sqrt(count * 1.625));
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uChapter: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uCount: { value: count },
        uCols: { value: cols },
        uCream: { value: new THREE.Color("#edeae3") },
        uAmber: { value: new THREE.Color("#f0b254") },
      },
    });
  }, [count]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((state) => {
    const u = material.uniforms;
    if (!reducedMotion) u.uTime.value = state.clock.elapsedTime;
    const target = chapterFromScroll(anchors.current);
    u.uChapter.value += (target - u.uChapter.value) * (reducedMotion ? 1 : 0.06);
    u.uMouse.value.lerp(
      new THREE.Vector2(pointerState.x * 13, -pointerState.y * 8),
      0.05
    );
  });

  return <points geometry={geometry} material={material} frustumCulled={false} />;
}

/* ————— The core artifact: present at SIGNAL, returns as THE BEACON ————— */
function Core({ reducedMotion }: { reducedMotion: boolean }) {
  const anchors = useAnchors();
  const group = useRef<THREE.Group>(null);
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const chapter = useRef(0);

  const heroPos = useMemo(() => new THREE.Vector3(3.4, 0.7, -0.5), []);
  const beaconPos = useMemo(() => new THREE.Vector3(0, 0.3, 0), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const c = chapterFromScroll(anchors.current);
    chapter.current += (c - chapter.current) * (reducedMotion ? 1 : 0.06);
    const ch = chapter.current;

    /* visible at hero, hidden mid-story, reborn as beacon */
    let scale: number;
    if (ch < 0.5) scale = 1;
    else if (ch < 1.5) scale = Math.max(0, 1 - (ch - 0.5) * 2);
    else if (ch > 4.35) scale = Math.min(1.15, (ch - 4.35) * 1.8);
    else scale = 0;

    const g = group.current;
    if (!g) return;
    const beaconMix = THREE.MathUtils.smoothstep(ch, 4.3, 5);
    g.position.lerpVectors(heroPos, beaconPos, beaconMix);
    g.position.y += Math.sin(t * 1.1) * 0.18 * scale;
    g.scale.setScalar(Math.max(0.0001, scale));
    g.visible = scale > 0.01;

    const speed = 1 + beaconMix * 2.2;
    if (outer.current) {
      outer.current.rotation.y += delta * 0.18 * speed;
      outer.current.rotation.x = Math.sin(t * 0.22) * 0.25;
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.4 * speed;
      inner.current.rotation.z += delta * 0.15 * speed;
      const s = 1 + Math.sin(t * (1.4 + beaconMix * 2)) * 0.08;
      inner.current.scale.setScalar(s);
    }
    if (ringA.current) ringA.current.rotation.z += delta * 0.25 * speed;
    if (ringB.current) ringB.current.rotation.z -= delta * 0.18 * speed;
  });

  return (
    <group ref={group}>
      <mesh ref={outer}>
        <icosahedronGeometry args={[2.1, 1]} />
        <meshBasicMaterial color="#edeae3" wireframe transparent opacity={0.16} />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.85, 0]} />
        <meshBasicMaterial color="#f0b254" wireframe transparent opacity={0.85} />
      </mesh>
      <sprite scale={[5.2, 5.2, 1]}>
        <spriteMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          color="#f0b254"
          opacity={0.1}
          map={glowTexture()}
        />
      </sprite>
      <mesh ref={ringA} rotation={[Math.PI / 2.4, 0.4, 0]}>
        <torusGeometry args={[2.9, 0.006, 8, 128]} />
        <meshBasicMaterial color="#f0b254" transparent opacity={0.5} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 1.9, -0.5, 0.7]}>
        <torusGeometry args={[3.4, 0.004, 8, 128]} />
        <meshBasicMaterial color="#edeae3" transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

/* radial gradient texture for the glow sprite — module-level cache */
let _glowTex: THREE.Texture | null = null;
function glowTexture() {
  if (_glowTex) return _glowTex;
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.35)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  _glowTex = new THREE.CanvasTexture(canvas);
  return _glowTex;
}

/* ————— camera rig: pointer parallax ————— */
function Rig() {
  const target = useRef(new THREE.Vector3(0, 0.6, 9.5));

  useFrame(({ camera }) => {
    target.current.x = pointerState.x * 0.9;
    target.current.y = 0.6 + pointerState.y * 0.5;
    camera.position.lerp(target.current, 0.04);
    camera.lookAt(0, 0.2, 0);
  });

  return null;
}

export default function Scene() {
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointerState.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerState.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.6, 9.5], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <fog attach="fog" args={["#0b0b0e", 9, 24]} />
      <StoryParticles count={isMobile ? 3375 : 8000} reducedMotion={reducedMotion} />
      <Core reducedMotion={reducedMotion} />
      {!reducedMotion && <Rig />}
    </Canvas>
  );
}
