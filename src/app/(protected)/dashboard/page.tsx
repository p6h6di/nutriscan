"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { detectFood } from "@/lib/food-detection";
import { getFoodInfo } from "@/lib/food-info";
import { useRouter } from "next/navigation";
import Logo from "@/assets/logo";
import { Camera, Focus, SwitchCamera, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import dashboardAnimation from "../../../assets/dashboard-animation.json";
import Lottie from "lottie-react";
import { cn } from "@/lib/utils";
import { AnalysisHistory } from "@/components/history";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const router = useRouter();

  // Clean up camera stream when component unmounts
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Ensure video is playing when camera is opened
  useEffect(() => {
    if (isCameraOpen && videoRef.current) {
      const playVideo = async () => {
        try {
          await videoRef.current?.play();
        } catch (error) {
          console.error("Error playing video:", error);
          setCameraError("Could not start video stream. Please try again.");
        }
      };

      playVideo();
    }
  }, [isCameraOpen]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview image
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Process image
    processImage(file);
  };

  const processImage = async (file: File) => {
    try {
      setIsLoading(true);
      const detectedFood = await detectFood(file);
      const foodInfo = await getFoodInfo(detectedFood);

      // Store data in localStorage
      localStorage.setItem("foodData", JSON.stringify(foodInfo));

      // Navigate to analysis page
      router.push("/analysis");
    } catch (error) {
      console.error("Error processing image:", error);
      alert("Error processing image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const openCamera = async () => {
    setCameraError(null);
    try {
      // Try user-facing camera first (front camera)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch((err) => {
            console.error("Error playing video:", err);
            setCameraError("Could not start video stream. Please try again.");
          });
        };
      }

      setIsCameraOpen(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraError("Could not access camera. Please check permissions.");
    }
  };

  const captureImage = () => {
    if (!videoRef.current || !streamRef.current) {
      setCameraError("Camera not initialized properly. Please try again.");
      return;
    }

    try {
      const videoElement = videoRef.current;

      // Create canvas with the same dimensions as the video
      const canvas = document.createElement("canvas");
      const width = videoElement.videoWidth;
      const height = videoElement.videoHeight;

      // Ensure we have valid dimensions
      if (!width || !height) {
        setCameraError("Could not get video dimensions. Please try again.");
        return;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setCameraError("Could not create capture context. Please try again.");
        return;
      }

      // Draw the current video frame to the canvas
      ctx.drawImage(videoElement, 0, 0, width, height);

      // Convert canvas to blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            // Create a file from the blob
            const file = new File([blob], "camera-capture.jpg", {
              type: "image/jpeg",
            });

            // Set preview image
            const imageUrl = URL.createObjectURL(blob);
            setPreviewImage(imageUrl);

            // Close camera
            closeCamera();

            // Process the captured image
            processImage(file);
          } else {
            setCameraError("Failed to create image. Please try again.");
          }
        },
        "image/jpeg",
        0.9
      );
    } catch (err) {
      console.error("Error capturing image:", err);
      setCameraError("Error capturing image. Please try again.");
    }
  };

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
    setCameraError(null);
  };

  // Handle switching camera (front/back) if available
  const switchCamera = async () => {
    // Close current stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    try {
      // Check current facing mode
      const currentTrack = streamRef.current?.getVideoTracks()[0];
      const currentFacingMode = currentTrack?.getSettings().facingMode;

      // Toggle facing mode
      const newFacingMode =
        currentFacingMode === "user" ? "environment" : "user";

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: newFacingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(console.error);
        };
      }
    } catch (err) {
      console.error("Error switching camera:", err);
      setCameraError(
        "Could not switch camera. Device may only have one camera."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF8E1] dark:bg-slate-900 transition-colors duration-300 md:px-0 px-4">
      <AnalysisHistory />

      <div className="relative w-full max-w-md p-8 bg-white dark:bg-slate-800 rounded-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
        <h1 className="text-xl font-medium mb-4 dark:text-white text-center flex items-center justify-center gap-x-2">
          <Logo className="size-6" />
          <span>Nutriscan</span>
        </h1>

        <div
          className={cn(
            "my-6 border w-full h-[300px] rounded-2xl flex items-center justify-center overflow-hidden",
            previewImage && "border-none"
          )}
        >
          {previewImage ? (
            <div className="relative w-full h-[300px] mb-4">
              <Image
                src={previewImage}
                alt="Food preview"
                fill
                objectFit="cover"
                className="rounded-2xl w-full h-[300px]"
              />
            </div>
          ) : (
            <Lottie
              animationData={dashboardAnimation}
              loop={true}
              className="w-full h-auto"
              style={{ width: "100%", height: "300px" }}
              rendererSettings={{
                preserveAspectRatio: "xMidYMid slice",
              }}
            />
          )}
        </div>

        <div className="flex gap-4">
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="flex-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 active:translate-x-2 active:translate-y-2 transition-all bg-white text-black border border-black hover:bg-white"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Photo
          </Button>

          <Button
            onClick={openCamera}
            disabled={isLoading}
            className="flex-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 active:translate-x-2 active:translate-y-2 transition-all bg-white text-black border border-black hover:bg-white"
          >
            <Camera className="mr-2 h-4 w-4" />
            Take Photo
          </Button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        <div className="py-6 text-center">
          {isLoading ? (
            <div className="text-center mt-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#fbd969] mx-auto"></div>
              <p className="mt-2 text-gray-600">Analyzing food...</p>
            </div>
          ) : (
            <p className="text-sm font-medium">
              Point your camera at a food item or upload an image. Our model
              will identify the food and provide nutrition analysis.
            </p>
          )}
        </div>
      </div>

      {/* CAMERA_MODAL */}
      {isCameraOpen && (
        <div className="fixed inset-0 backdrop-blur-2xl bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-full max-w-md p-8 bg-white dark:bg-slate-800 rounded-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold">Take a Photo</h2>
              <button
                onClick={closeCamera}
                className="text-black hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="relative bg-gray-100 mb-4 rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
                style={{ minHeight: "300px", maxHeight: "50vh" }}
              />
            </div>

            <div className="flex gap-x-4 mt-8">
              <Button
                onClick={captureImage}
                className="flex-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 active:translate-x-2 active:translate-y-2 transition-all bg-white text-black border border-black hover:bg-white"
              >
                <Focus className="mr-2 h-4 w-4" />
                Capture
              </Button>

              <Button
                onClick={switchCamera}
                className="flex-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 active:translate-x-2 active:translate-y-2 transition-all bg-white text-black border border-black hover:bg-white"
              >
                <SwitchCamera className="mr-2 h-4 w-4" />
                Switch Camera
              </Button>
            </div>

            {cameraError && (
              <div className="my-4 p-2 text-sm font-medium bg-red-100 text-red-700 rounded-lg">
                {cameraError}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
