import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { a, useSpring } from '@react-spring/three'
import Dice from '../public/Dice'
import './index.css'

function App() {
    const [rolling, setRolling] = useState(false)

    // React spring to handle smooth animation
    const [rotation, setRotation] = useSpring(() => ({
        rotation: [0, 0, 0],
        config: { mass: 1, tension: 180, friction: 30 }
    }))

    // Function to simulate dice roll with smooth transition
    const rollDice = () => {
        if (rolling) return // Prevent multiple rolls at the same time
        setRolling(true)

        // Randomize rotation to simulate dice roll
        const randomRotation = [
            Math.random() * Math.PI * 2, // Random x-axis rotation
            Math.random() * Math.PI * 2, // Random y-axis rotation
            Math.random() * Math.PI * 2  // Random z-axis rotation
        ]

        // Trigger the rotation animation for roll
        setRotation({ rotation: randomRotation })

        // After rolling, transition to a random dice face
        setTimeout(() => {
            // Randomize final rotation to simulate a random dice face
            const finalRotation = [
                Math.floor(Math.random() * 4) * Math.PI / 2, // Randomize between 0, PI/2, PI, 3*PI/2 on the x-axis
                Math.floor(Math.random() * 4) * Math.PI / 2, // Randomize between 0, PI/2, PI, 3*PI/2 on the y-axis
                Math.floor(Math.random() * 4) * Math.PI / 2  // Randomize between 0, PI/2, PI, 3*PI/2 on the z-axis
            ]

            // Transition smoothly to the final rotation
            setRotation({ rotation: finalRotation })

            // Reset rolling state after animation completes (1.5s for roll + 1s for transition)
            setTimeout(() => setRolling(false), 1000)
        }, 1500) // Duration of the roll animation
    }

    return (
        <div className='bg-black h-screen' style={{ height: "100vh", background: "black" }}>
            <Canvas>
                <Suspense fallback={null}>
                    <ambientLight intensity={3} />
                    <OrbitControls />
                    <a.group rotation={rotation.rotation}>
                        <Dice />
                    </a.group>
                </Suspense>
            </Canvas>
            <button
                onClick={rollDice}
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '16px',
                    cursor: 'pointer'
                }}
            >
                Roll Dice
            </button>
        </div>
    )
}

export default App
