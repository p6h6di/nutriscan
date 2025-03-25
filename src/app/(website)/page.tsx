import Logo from "@/assets/logo";
import Link from "next/link";
import { JSX } from "react";

export default function Home() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f4f2f0] px-10 py-3">
      <div className="flex items-center gap-2.5 text-[#181411]">
        <Logo className="size-6" />
        <h2 className="text-[#181411] text-lg font-bold leading-tight tracking-[-0.015em]">
          NutriScan
        </h2>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <Link
            href="#"
            className="text-[#181411] text-sm font-medium leading-normal"
          >
            How it Works
          </Link>
          <Link
            href="#"
            className="text-[#181411] text-sm font-medium leading-normal"
          >
            Blog
          </Link>
          <Link
            href="#"
            className="text-[#181411] text-sm font-medium leading-normal"
          >
            FAQ
          </Link>
        </div>
        <div className="flex gap-2">
          <Link
            href="/sign-up"
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e68019] text-[#181411] text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Sign Up</span>
          </Link>
          <Link
            href="/sign-in"
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f4f2f0] text-[#181411] text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Log In</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

function MainContent() {
  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <HeroBanner />
        <WhatWeAnalyzeSection />
        <HowItWorksSection />
        <TestimonialsSection />
      </div>
    </div>
  );
}

function HeroBanner() {
  return (
    <div className="@container">
      <div className="@[480px]:p-4">
        <div
          className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-start justify-end px-4 pb-10 @[480px]:px-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://cdn.usegalileo.ai/sdxl10/5ac41c75-7a37-481a-9f15-44d6cbafbc66.png")',
          }}
        >
          <div className="flex flex-col gap-2 text-left">
            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
              Nutrition analysis made easy
            </h1>
            <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
              Get instant nutrition facts for any food. Just take a photo or
              upload a food image.
            </h2>
          </div>
          <SearchBar />
        </div>
      </div>
    </div>
  );
}

function SearchBar() {
  return (
    <label className="flex flex-col min-w-40 h-14 w-full max-w-[480px] @[480px]:h-16">
      <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
        <div className="text-[#887563] flex border border-[#e5e0dc] bg-white items-center justify-center pl-[15px] rounded-l-xl border-r-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
          </svg>
        </div>
        <input
          placeholder="Take a photo or upload a food image"
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#181411] focus:outline-0 focus:ring-0 border border-[#e5e0dc] bg-white focus:border-[#e5e0dc] h-full placeholder:text-[#887563] px-[15px] rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal"
        />
        <div className="flex items-center justify-center rounded-r-xl border-l-0 border border-[#e5e0dc] bg-white pr-[7px]">
          <Link
            href="/dashboard"
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#e68019] text-[#181411] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
          >
            <span className="truncate">Analyze</span>
          </Link>
        </div>
      </div>
    </label>
  );
}

function WhatWeAnalyzeSection() {
  const foodCategories = [
    {
      id: 1,
      title: "Packaged foods",
      description: "Nutrition facts, ingredients, and more",
      image:
        "https://cdn.usegalileo.ai/sdxl10/752bd04f-2068-4a60-8ac9-9a3e4c6f60ce.png",
    },
    {
      id: 2,
      title: "Beverages",
      description: "Calories, sugar, caffeine, and more",
      image:
        "https://cdn.usegalileo.ai/sdxl10/5017a898-6b11-4fe1-b18e-0bee5dfe829c.png",
    },
    {
      id: 3,
      title: "Snacks",
      description: "Portion size, calories, and more",
      image:
        "https://cdn.usegalileo.ai/sdxl10/8a3244ae-e192-45e1-a741-571238ff7138.png",
    },
    {
      id: 4,
      title: "Meals",
      description: "Serving size, calories, and more",
      image:
        "https://cdn.usegalileo.ai/sdxl10/6120c83a-7b6b-4688-8c33-67a68b8feef0.png",
    },
    {
      id: 5,
      title: "Recipes",
      description: "Nutrition facts for the entire recipe",
      image:
        "https://cdn.usegalileo.ai/sdxl10/7cc55605-0f65-4b34-9d54-d199af2ce2b4.png",
    },
  ];

  return (
    <div className="flex flex-col gap-10 px-4 py-10 @container">
      <div className="flex flex-col gap-4">
        <h1 className="text-[#181411] tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
          What NutriScan can analyze
        </h1>
        <p className="text-[#181411] text-base font-normal leading-normal max-w-[720px]">
          Just upload a photo of a food image or take a photo of a food item.
        </p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
        {foodCategories.map((category) => (
          <FoodCategoryCard
            key={category.id}
            title={category.title}
            description={category.description}
            image={category.image}
          />
        ))}
      </div>
    </div>
  );
}

function FoodCategoryCard({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <div className="flex flex-col gap-3 pb-3">
      <div
        className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
        style={{ backgroundImage: `url("${image}")` }}
      ></div>
      <div>
        <p className="text-[#181411] text-base font-medium leading-normal">
          {title}
        </p>
        <p className="text-[#887563] text-sm font-normal leading-normal">
          {description}
        </p>
      </div>
    </div>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      id: 1,
      title: "Step 1: Take a photo",
      description: "Take a photo of the food item",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
        </svg>
      ),
    },
    {
      id: 2,
      title: "Step 2: Upload a image",
      description: "Or upload an existing image of a nutrition food",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M208,56H180.28L166.65,35.56A8,8,0,0,0,160,32H96a8,8,0,0,0-6.65,3.56L75.71,56H48A24,24,0,0,0,24,80V192a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V80A24,24,0,0,0,208,56Zm8,136a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8H80a8,8,0,0,0,6.66-3.56L100.28,48h55.43l13.63,20.44A8,8,0,0,0,176,72h32a8,8,0,0,1,8,8ZM128,88a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,88Zm0,72a28,28,0,1,1,28-28A28,28,0,0,1,128,160Z"></path>
        </svg>
      ),
    },
    {
      id: 3,
      title: "Step 3: Get instant results",
      description: "View the full nutrition facts, ingredients, and more",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
        </svg>
      ),
    },
    {
      id: 4,
      title: "Step 4: Analyze recipes",
      description: "Analyze an recipe by uploading a photo or text",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M184,72H40A16,16,0,0,0,24,88V200a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V88A16,16,0,0,0,184,72Zm0,128H40V88H184V200ZM232,56V176a8,8,0,0,1-16,0V56H64a8,8,0,0,1,0-16H216A16,16,0,0,1,232,56Z"></path>
        </svg>
      ),
    },
    {
      id: 5,
      title: "Step 5: Explore insights",
      description:
        "Explore detailed insights on your nutrition trends and habits",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M205.66,149.66l-72,72a8,8,0,0,1-11.32,0l-72-72a8,8,0,0,1,11.32-11.32L120,196.69V40a8,8,0,0,1,16,0V196.69l58.34-58.35a8,8,0,0,1,11.32,11.32Z"></path>
        </svg>
      ),
    },
  ];

  return (
    <>
      <h2 className="text-[#181411] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        How it works
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        {steps.map((step) => (
          <StepCard
            key={step.id}
            title={step.title}
            description={step.description}
            icon={step.icon}
          />
        ))}
      </div>
    </>
  );
}

function StepCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: JSX.Element;
}) {
  return (
    <div className="flex flex-1 gap-3 rounded-lg border border-[#e5e0dc] bg-white p-4 flex-col">
      <div className="text-[#181411]">{icon}</div>
      <div className="flex flex-col gap-1">
        <h2 className="text-[#181411] text-base font-bold leading-tight">
          {title}
        </h2>
        <p className="text-[#887563] text-sm font-normal leading-normal">
          {description}
        </p>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Emily",
      quote:
        "I love using NutriScan to track my macros and see how much sugar is in my favorite snacks",
      image:
        "https://cdn.usegalileo.ai/sdxl10/c8aa9507-436a-4be8-b954-af03a98da139.png",
    },
    {
      id: 2,
      name: "Alex",
      quote:
        "I use NutriScan to analyze recipes and find healthier substitutes for ingredients",
      image:
        "https://cdn.usegalileo.ai/sdxl10/f6ebdf79-c10e-4cab-be76-3cec35482022.png",
    },
    {
      id: 3,
      name: "Sarah",
      quote:
        "NutriScan has helped me make more informed choices about the foods I eat every day",
      image:
        "https://cdn.usegalileo.ai/sdxl10/c5aac290-2ab3-4209-9f72-861340002c26.png",
    },
    {
      id: 4,
      name: "Mike",
      quote:
        "I'm training for a marathon and NutriScan helps me keep track of my calorie intake and nutrient balance",
      image:
        "https://cdn.usegalileo.ai/sdxl10/ff2d285c-168d-4174-8eb0-d1d38588cd82.png",
    },
    {
      id: 5,
      name: "Mike",
      quote:
        "I'm training for a marathon and NutriScan helps me keep track of my calorie intake and nutrient balance",
      image:
        "https://cdn.usegalileo.ai/sdxl10/ff2d285c-168d-4174-8eb0-d1d38588cd82.png",
    },
    {
      id: 6,
      name: "Mike",
      quote:
        "I'm training for a marathon and NutriScan helps me keep track of my calorie intake and nutrient balance",
      image:
        "https://cdn.usegalileo.ai/sdxl10/ff2d285c-168d-4174-8eb0-d1d38588cd82.png",
    },
  ];

  return (
    <>
      <h2 className="text-[#181411] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Our Team
      </h2>
      <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="grid grid-cols-3 p-4 gap-x-4 gap-y-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              quote={testimonial.quote}
              image={testimonial.image}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function TestimonialCard({
  name,
  quote,
  image,
}: {
  name: string;
  quote: string;
  image: string;
}) {
  return (
    <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
      <div
        className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl flex flex-col"
        style={{ backgroundImage: `url("${image}")` }}
      ></div>
      <div>
        <p className="text-[#181411] text-base font-medium leading-normal">
          {name}
        </p>
        <p className="text-[#887563] text-sm font-normal leading-normal">
          {quote}
        </p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="flex justify-center">
      <div className="flex max-w-[960px] flex-1 flex-col">
        <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">
          <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
            <Link
              href="#"
              className="text-[#887563] text-base font-normal leading-normal min-w-40"
            >
              How it Works
            </Link>
            <Link
              href="#"
              className="text-[#887563] text-base font-normal leading-normal min-w-40"
            >
              Blog
            </Link>
            <Link
              href="#"
              className="text-[#887563] text-base font-normal leading-normal min-w-40"
            >
              FAQ
            </Link>
            <Link
              href="#"
              className="text-[#887563] text-base font-normal leading-normal min-w-40"
            >
              About Us
            </Link>
            <Link
              href="#"
              className="text-[#887563] text-base font-normal leading-normal min-w-40"
            >
              Contact Us
            </Link>
            <Link
              href="#"
              className="text-[#887563] text-base font-normal leading-normal min-w-40"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-[#887563] text-base font-normal leading-normal min-w-40"
            >
              Terms of Service
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#">
              <div className="text-[#887563]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path>
                </svg>
              </div>
            </Link>
            <Link href="#">
              <div className="text-[#887563]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"></path>
                </svg>
              </div>
            </Link>
            <Link href="#">
              <div className="text-[#887563]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
                </svg>
              </div>
            </Link>
          </div>
        </footer>
      </div>
    </footer>
  );
}
