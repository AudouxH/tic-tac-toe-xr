import React, { useState, useMemo, useRef } from 'react';
import './App.css';
import { VRButton, XR, Controllers, Hands } from '@react-three/xr';
import { Canvas, useThree, useLoader } from '@react-three/fiber';
import { useDrag } from '@use-gesture/react';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import circle from './assets/Circle.glb';
import cross from './assets/Cross.glb';
import grid from './assets/Grid.glb';
import laptop from './assets/laptop.glb';
import coffee from './assets/coffee.glb';
import ether from './assets/ether.glb';
import phone from './assets/galaxyS20.glb';
import twitch from './assets/twitch.glb';

const ModelCircle = ({ posX, posY, setArrayPosition, arrayPosition, index, moveIndex, setMoveIndex }) => {
  const { scene } = useLoader(GLTFLoader, circle);
  const copiedScene = useMemo(() => scene.clone(), [scene]);

  const Crossref = useRef();
  const [position, setPosition] = useState([0, 0, 0]);
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const bind = useDrag(
    ({ active, offset: [x, y] }) => {
      if (index === moveIndex) {
        setPosition([x / aspect, 0, y / aspect]);
        const newPos = arrayPosition;
        newPos.splice(index, 1, { posX: posX + x, posY: posY + y });
        setArrayPosition(newPos);
        if (!active && (x > 250 && x < 880) && (y > 150 && y < 760)) {
          setMoveIndex(moveIndex + 1);
        }
      }
    },
    { pointerEvents: true }
  );

  return (
    <group>
      <mesh
        position={position}
        {...bind()}
        ref={Crossref}>
        <primitive object={copiedScene} position={[posX, 0, posY]} />
      </mesh>
    </group>
  );
}

const ModelCross = ({ posX, posY, setArrayPosition, arrayPosition, index, moveIndex, setMoveIndex }) => {
  const { scene } = useLoader(GLTFLoader, cross);
  const copiedScene = useMemo(() => scene.clone(), [scene]);


  const Circleref = useRef();
  const [position, setPosition] = useState([0, 0, 0]);
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const bind = useDrag(
    ({ active, offset: [x, y] }) => {
      if (index === moveIndex) {
        setPosition([x / aspect, 0, y / aspect]);
        const newPos = arrayPosition;
        newPos.splice(index, 1, { posX: posX + x, posY: posY + y });
        setArrayPosition(newPos);
        if (!active && (x > -900 && x < -230) && (y > 150 && y < 800)) {
          setMoveIndex(moveIndex + 1);
        }
      }
    },
    { pointerEvents: true }
  );

  return (
    <group>
      <mesh
        position={position}
        {...bind()}
        ref={Circleref}>
        <primitive object={copiedScene} position={[posX, 0, posY]} />
      </mesh>
    </group>
  );
}

const Plan = () => {
  const gridShade = useLoader(GLTFLoader, grid);

  return (
    <mesh>
      <primitive object={gridShade.scene} position={[0, 0, 0]} />
    </mesh>
  );
}

const Laptop = () => {
  const laptopShade = useLoader(GLTFLoader, twitch);

  return (
    <mesh>
      <primitive object={laptopShade.scene} position={[0, 0, 0]} />
    </mesh>
  );
}

const App = () => {
  const [listOfModel] = useState([
    { posX: 7, posY: -6, isCircle: false },
    { posX: -11, posY: -6, isCircle: true },
    { posX: 7, posY: -6, isCircle: false },
    { posX: -11, posY: -6, isCircle: true },
    { posX: 7, posY: -6, isCircle: false },
    { posX: -11, posY: -6, isCircle: true },
    { posX: 7, posY: -6, isCircle: false },
    { posX: -11, posY: -6, isCircle: true },
    { posX: 7, posY: -6, isCircle: false },
    { posX: -11, posY: -6, isCircle: true },
  ]);
  const [arrayPosition, setArrayPosition] = useState([]);
  const [moveIndex, setMoveIndex] = useState(0);

  return (
    <>
      <VRButton />
      <Canvas style={{ width: '100vw', height: '100vh' }} camera={{ fov: 80, position: [0, 10, 0] }}>
        <XR>
          <Controllers />
          <Hands />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          {/* {listOfModel.length ?
            listOfModel.map((model, index) => {
              if (model.isCircle) {
                return <ModelCircle
                  posX={model.posX}
                  posY={model.posY}
                  setArrayPosition={setArrayPosition}
                  arrayPosition={arrayPosition}
                  key={index}
                  index={index}
                  moveIndex={moveIndex}
                  setMoveIndex={setMoveIndex} />
              }
              else {
                return <ModelCross
                  posX={model.posX}
                  posY={model.posY}
                  setArrayPosition={setArrayPosition}
                  arrayPosition={arrayPosition}
                  key={index}
                  index={index}
                  moveIndex={moveIndex}
                  setMoveIndex={setMoveIndex} />
              }
            }) : <React.Fragment />
          } */}
          <Laptop/>
          <OrbitControls/>
          {/* <Plan /> */}
        </XR>
      </Canvas>
    </>
  );
}

export default App;
