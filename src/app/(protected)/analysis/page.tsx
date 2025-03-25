"use client";

import { useEffect, useState } from "react";
import type { FoodData } from "@/types/data.types";
import Link from "next/link";
import { ArrowLeft, ChefHat, Heart, Leaf, UtensilsCrossed } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

const span = 1;

export default function Analysis() {
  const [foodData, setFoodData] = useState<FoodData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("macros");

  useEffect(() => {
    const storedData = localStorage.getItem("foodData");
    if (storedData) {
      setFoodData(JSON.parse(storedData));
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!foodData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Food Data Available</h1>
          <p className="mb-4">You haven't analyzed any food yet.</p>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  const macroData = [
    {
      name: "Calories (kcal)",
      value: foodData.nutrition.calories,
      fill: "#FF6384",
    },
    { name: "Protein (g)", value: foodData.nutrition.protein, fill: "#36A2EB" },
    { name: "Fat (g)", value: foodData.nutrition.fat, fill: "#FFCE56" },
    { name: "Carbs (g)", value: foodData.nutrition.carbs, fill: "#4BC0C0" },
    { name: "Sugar (g)", value: foodData.nutrition.sugar, fill: "#9966FF" },
    { name: "Fiber (g)", value: foodData.nutrition.fiber, fill: "#FF9F40" },
    {
      name: "Sodium (mg/10)",
      value: foodData.nutrition.sodium / 10,
      fill: "#C7C7C7",
    },
  ];

  // Colors for charts
  const COLORS = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
  ];

  // MODIFIED: Prepare vitamins data for radar chart
  const vitaminsRadarData = foodData.nutrition.vitamins
    ? Object.entries(foodData.nutrition.vitamins).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  // Prepare minerals data for pie chart
  const mineralsPieData = foodData.nutrition.minerals
    ? Object.entries(foodData.nutrition.minerals).map(
        ([name, value], index) => ({
          name,
          value,
          fill: COLORS[index % COLORS.length],
        })
      )
    : [];

  return (
    <div className="bg-[#FFF8E1]">
      <div className="min-h-screen max-w-3xl mx-auto py-12">
        <div className="relative w-full p-8 bg-white dark:bg-slate-800 rounded-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
          {/* FOOD_NAME && DESCRIPTION && ORIGIN */}
          <div className="space-y-4">
            <Link
              href="/dashboard"
              className={buttonVariants({
                variant: "ghost",
                className: "bg-muted",
              })}
            >
              <ArrowLeft className="size-5" />
            </Link>
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-semibold text-black">
                {foodData.name}
              </h1>
              <span className="text-xs font-medium border px-2 py-1 rounded-full">
                {foodData.origin}
              </span>
            </div>
            <p className="text-base leading-6 text-black/80">
              {foodData.description}
            </p>
          </div>
          {/* COOKING_METHODS && COMMON DISHES */}
          <div className="py-12 flex items-center gap-16">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span>
                  <ChefHat className="size-5" />
                </span>
                <h2 className="text-xl font-semibold">Cooking Methods</h2>
              </div>
              <ul className="text-center flex space-x-2">
                {foodData.cookingMethods.map((method, index) => {
                  const randomLightColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 92%)`;
                  return (
                    <li
                      key={index}
                      className="mb-1 text-sm font-medium p-3 rounded-full"
                      style={{
                        backgroundColor: randomLightColor,
                      }}
                    >
                      {method}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <UtensilsCrossed className="size-5" />
                <h2 className="text-xl font-semibold">Common Dishes</h2>
              </div>
              <ul className="text-center flex space-x-2">
                {foodData.commonDishes.map((dish, index) => {
                  const randomLightColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 92%)`;
                  return (
                    <li
                      key={index}
                      className="mb-1 text-sm font-medium px-3 py-2 rounded-full"
                      style={{
                        backgroundColor: randomLightColor,
                      }}
                    >
                      {dish}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {/* HEALTH_BENEFITS */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-semibold">Health Benefits</h2>
            </div>
            <ul className="divide-y text-black/80 text-base">
              {foodData.healthBenefits.map((benefit, index) => (
                <li key={index} className="py-2 flex items-center space-x-2">
                  <Leaf className="size-4" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Nutrition info */}
          <div className="py-12">
            <h1 className="text-xl font-semibold">Nutrition Summary</h1>
            <p className="text-sm text-accent-foreground mb-6">
              Calories and primary nutritional information
            </p>
            <div
              className={`grid grid-cols-2 gap-4 rounded-lg col-span-${span} transition-all duration-300`}
            >
              <div className="bg-gray-100 p-4 rounded-lg backdrop-blur-3xl">
                <h4 className="font-semibold text-sm">Calories</h4>
                <p className="text-xl">{foodData.nutrition.calories} kcal</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg backdrop-blur-3xl">
                <h4 className="font-semibold text-sm">Protein</h4>
                <p className="text-xl">{foodData.nutrition.protein} g</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg backdrop-blur-3xl">
                <h4 className="font-semibold text-sm">Fat</h4>
                <p className="text-xl">{foodData.nutrition.fat} g</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg backdrop-blur-3xl">
                <h4 className="font-semibold text-sm">Carbohydrates</h4>
                <p className="text-xl">{foodData.nutrition.carbs} g</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg backdrop-blur-3xl">
                <h4 className="font-semibold text-sm">Sugar</h4>
                <p className="text-xl">{foodData.nutrition.sugar} g</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg backdrop-blur-3xl">
                <h4 className="font-semibold text-sm">Fiber</h4>
                <p className="text-xl">{foodData.nutrition.fiber} g</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg backdrop-blur-3xl col-span-2">
                <h4 className="font-semibold text-sm">Sodium</h4>
                <p className="text-xl">{foodData.nutrition.sodium} mg</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b mb-6">
            <button
              onClick={() => setActiveTab("macros")}
              className={`py-2 px-4 font-medium ${
                activeTab === "macros"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              Macronutrients
            </button>
            {vitaminsRadarData.length > 0 && (
              <button
                onClick={() => setActiveTab("vitamins")}
                className={`py-2 px-4 font-medium ${
                  activeTab === "vitamins"
                    ? "border-b-2 border-black text-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                Vitamins
              </button>
            )}
            {mineralsPieData.length > 0 && (
              <button
                onClick={() => setActiveTab("minerals")}
                className={`py-2 px-4 font-medium ${
                  activeTab === "minerals"
                    ? "border-b-2 border-black text-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                Minerals
              </button>
            )}
          </div>

          <div className="h-96 w-full">
            {/* Macronutrients Bar Chart */}
            {activeTab === "macros" && (
              <div className="h-full w-full" key="macro-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={macroData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={70}
                    />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value}`} />
                    <Legend />
                    <Bar
                      dataKey="value"
                      name="Amount"
                      animationDuration={1500}
                      animationBegin={0}
                      animationEasing="ease-in-out"
                    >
                      {macroData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* MODIFIED: Vitamins Radar Chart */}
            {activeTab === "vitamins" && vitaminsRadarData.length > 0 && (
              <div className="h-full w-full" key="vitamin-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    data={vitaminsRadarData}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" className="text-sm" />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, "auto"]}
                      tick={{ fill: "#666" }}
                      tickCount={5}
                      label={{ value: "", position: "outside" }}
                    />
                    <Radar
                      name="Daily Value %"
                      dataKey="value"
                      stroke="#FF6384"
                      fill="#FF6384"
                      fillOpacity={0.6}
                      animationDuration={1500}
                      animationBegin={0}
                      animationEasing="ease-in-out"
                    />
                    <Tooltip formatter={(value) => `${value}% DV`} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Minerals Pie Chart */}
            {activeTab === "minerals" && mineralsPieData.length > 0 && (
              <div className="h-full w-full" key="mineral-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mineralsPieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      labelLine={true}
                      animationDuration={1500}
                      animationBegin={0}
                      animationEasing="ease-in-out"
                    >
                      {mineralsPieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}% DV`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center my-12">
            <Link href="/dashboard" className="border rounded-full p-2 text-sm">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
