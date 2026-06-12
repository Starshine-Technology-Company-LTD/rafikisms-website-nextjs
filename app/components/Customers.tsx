import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { Marquee } from "./ui/3d-testimonials";

const testimonials = [
  {
    name: "Neema Ally",
    username: "@neema",
    body: "Rafiki SMS gave us one reliable API flow for OTP and transaction alerts across all our products.",
    img: "https://randomuser.me/api/portraits/women/32.jpg",
    country: "🇹🇿 Tanzania",
  },
  {
    name: "Juma Salim",
    username: "@juma",
    body: "The onboarding was seamless. We had our first live message sent within hours of KYC approval.",
    img: "https://randomuser.me/api/portraits/men/51.jpg",
    country: "🇹🇿 Tanzania",
  },
  {
    name: "Amina Hassan",
    username: "@amina",
    body: "Sender ID governance and per-vendor API keys made compliance effortless across all our clients.",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    country: "🇹🇿 Tanzania",
  },
  {
    name: "Baraka Mwangi",
    username: "@baraka",
    body: "Queue-based architecture inatuwezesha kutuma OTP za haraka sana. Rafiki SMS ni bora.",
    img: "https://randomuser.me/api/portraits/men/33.jpg",
    country: "🇹🇿 Tanzania",
  },
  {
    name: "Zainab Khamis",
    username: "@zainab",
    body: "99.7% delivery rate and real-time receipts. Exactly what our platform needed.",
    img: "https://randomuser.me/api/portraits/women/45.jpg",
    country: "🇹🇿 Tanzania",
  },
  {
    name: "Emmanuel Chacha",
    username: "@emma",
    body: "Bilingual support in English and Swahili made all the difference for our team.",
    img: "https://randomuser.me/api/portraits/men/22.jpg",
    country: "🇹🇿 Tanzania",
  },
];

function TestimonialCard({ img, name, username, body, country }: (typeof testimonials)[number]) {
  return (
    <Card className="w-64 border border-black/10 dark:border-white/10 bg-white dark:bg-[#111]">
      <CardContent className="p-5">
        <div className="flex items-center gap-2.5">
          <Avatar className="size-9 ring-2 ring-teal-500/30">
            <AvatarImage src={img} alt={name} />
            <AvatarFallback className="bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 text-xs">
              {name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <figcaption className="text-sm font-medium text-slate-900 dark:text-white flex items-center gap-1">
              {name} <span className="text-xs">{country}</span>
            </figcaption>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{username}</p>
          </div>
        </div>
        <blockquote className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          &ldquo;{body}&rdquo;
        </blockquote>
      </CardContent>
    </Card>
  );
}

export default function Customers() {
  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-black transition-colors duration-300 overflow-hidden" aria-labelledby="customers-heading">
      <div className="text-center mb-14 px-4">
        <h2 id="customers-heading" className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
          Loved by engineering teams
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto">
          Trusted by growing organizations across Tanzania.
        </p>
      </div>

      <div className="relative flex h-[400px] sm:h-[500px] w-full flex-row items-center justify-center overflow-hidden [perspective:300px]">
        <div
          className="flex flex-row items-center gap-4 scale-[0.45] sm:scale-100 origin-center"
          style={{
            transform:
              "translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
          }}
        >
          <Marquee vertical pauseOnHover repeat={3} className="[--duration:40s]">
            {testimonials.map((review) => (
              <TestimonialCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:40s]">
            {testimonials.map((review) => (
              <TestimonialCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee vertical pauseOnHover repeat={3} className="[--duration:40s]">
            {testimonials.map((review) => (
              <TestimonialCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:40s]">
            {testimonials.map((review) => (
              <TestimonialCard key={review.username} {...review} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-white dark:from-black"></div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white dark:from-black"></div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white dark:from-black"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white dark:from-black"></div>
        </div>
      </div>
    </section>
  );
}
