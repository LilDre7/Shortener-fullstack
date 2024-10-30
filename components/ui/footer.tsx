import DotPattern from "./dot-pattern";
import { cn } from "@/lib/utils";
import React, { FormEvent, useRef } from "react";
import emailjs from "@emailjs/browser";
import confetti from "canvas-confetti";

export default function Footer() {
  const form = useRef<HTMLFormElement>(null);

  const fireConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          process.env.EMAILJS_SERVICE_ID || "service_wggb1rt",
          process.env.EMAILJS_TEMPLATE_ID || "template_vyufg5h",
          form.current,
          process.env.EMAILJS_PUBLIC_KEY || "EQnk4jDWH6qVeKX9w"
        )
        .then(
          () => {
            form.current?.reset();
            fireConfetti();
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );
    }
  };

  return (
    <footer className="py-12 px-10 font-sans tracking-wide">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
        )}
      />
      <div className="lg:max-w-[80%] mx-auto text-center">
        <h3 className="text-3xl font-bold text-gray-800">Conecta Conmigo</h3>
        <p className="text-sm mt-6 text-gray-500">
          Siempre estoy buscando colaborar en proyectos interesantes y conocer
          personas en la industria. Si tienes alguna idea, proyecto, o
          simplemente quieres conectar, envíame un mensaje.
        </p>

        <form
          ref={form}
          onSubmit={sendEmail}
          className="bg-[#dddddd] outline-none flex px-2 py-1.5 rounded-full text-left mt-10"
        >
          <input
            placeholder="Enter your email"
            className="w-full outline-none bg-transparent text-sm pl-4"
            required
            type="email"
            name="user_email"
          />
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-full px-5 py-2.5 ml-4 transition-all"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>

      <hr className="border-gray-300 my-12" />

      <div className="grid gap-3">
        <div className="">
          <h4 className="text-lg font-bold mb-6 text-gray-800">Connect</h4>
          <ul className="flex justify-center gap-6">
            <li>
              <a
                href="https://www.linkedin.com/in/alvaro-aburto-dev/"
                className="text-gray-500 hover:text-gray-800 text-[15px]"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://github.com/LilDre7"
                className="text-gray-500 hover:text-gray-800 text-[15px]"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://alvaro-website.vercel.app/"
                className="text-gray-500 hover:text-gray-800 text-[15px]"
              >
                Portfolio
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6 text-gray-800">Skills</h4>
          <ul className="grid grid-cols-2 gap-3 text-center">
            <li className="text-gray-500 text-[15px]">
              React, Node.js, Express
            </li>
            <li className="text-gray-500 text-[15px]">
              TypeScript, VueJS, SASS
            </li>
            <li className="text-gray-500 text-[15px]">
              Git, Docker, Tailwind CSS
            </li>
            <li className="text-gray-500 text-[15px]">
              Three.js, Bootstrap, Astro
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-2 mt-5 text-gray-800">
            Sobre mi
          </h4>
          <p className="text-gray-500 mb-2 text-sm text-center">
            Soy un desarrollador de software apasionado por aprender y crecer en
            la industria 🛠️. Soy una persona comprometida, apasionada y creativa
            que siempre busca superar los desafíos y ofrecer soluciones
            innovadoras.
            <a
              href="mailto:youremail@example.com"
              className="text-gray-800 hover:text-gray-500"
            >
              <span className="text-blue-500 text-base"> alvaroaburto71@gmail.com</span>
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
