'use client'
import { nanoid } from '@/lib/utils'
// import { Chat } from '@/components/chat'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import img1 from "@/assets/img1.jpg"
import img2 from "@/assets/img2.jpg"
import Image from 'next/image'
import { useEffect, useState } from 'react';

export const runtime = 'edge'

export default function IndexPage() {
  const id = nanoid()

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3); // Assuming 3 slides
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const moveToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="slider-container">
          <div className="slider h-[50%]" id="slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            <div className="slide">
              <Image src={img1} alt="Image 1" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="slide">
              <Image src={img2} alt="Image 2" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="slide">
              <Image src={img1} alt="Image 3" className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>
          <div className="slider-controls flex justify-center mt-4">
            <button className="control-btn w-3 h-3 bg-gray-400 rounded-full mx-2" onClick={() => moveToSlide(0)}></button>
            <button className="control-btn w-3 h-3 bg-gray-400 rounded-full mx-2" onClick={() => moveToSlide(1)}></button>
            <button className="control-btn w-3 h-3 bg-gray-400 rounded-full mx-2" onClick={() => moveToSlide(2)}></button>
          </div>
        </div>

        <style jsx>{`
      .slider-container {
        position: relative;
        overflow: hidden;
        max-width: 100%;
      }
      .slider {
        display: flex;
        transition: transform 0.5s ease-in-out;
      }
      .slide {
        min-width: 100%;
        flex-shrink: 0;
      }
      .control-btn:hover {
        background-color: #000;
      }
          `}</style>

      </main>
      <div className="text-center py-12 px-4 bg-white">
        <h2 className="text-3xl font-semibold mb-2">
          Earn Bachelors in Engineering, and get ready to help
        </h2>
        <h1 className="text-4xl font-bold text-blue-800 mb-4">
          solve the world's greatest challenges
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-3xl mx-auto">
          Roll up your sleeves and work alongside with brightest students, recognized teachers and expert industry partners.
        </p>

        <div className="space-y-2 text-center">
          <p className="text-xl font-semibold">DTE CODE : <span className="text-blue-800">6250</span></p>
          <h3 className="text-2xl font-bold">D.Y. Patil College of Engineering & Technology</h3>
          <p className="text-lg">Kasaba Bawada, Kolhapur.</p>
          <p className="text-lg font-medium">An Autonomous Institute</p>
          <p className="text-sm text-gray-600">Approved by AICTE, DTE-Govt of Maharashtra and affiliated to Shivaji University</p>
        </div>
      </div>
      <Footer />
    </div>
  )
  // return <Chat id={id} />
}
