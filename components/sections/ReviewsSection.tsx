import { Star } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

interface ReviewsSectionProps {
  locale: string;
}

type ReviewItem = {
  name: string;
  origin: string;
  text: string;
  rating: number;
};

export async function ReviewsSection({ locale }: ReviewsSectionProps) {
  const t = await getTranslations({ locale, namespace: "reviews" });
  const reviews = t.raw("items") as ReviewItem[];

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="py-20 sm:py-28 bg-stone"
    >
      <Container>

        <ScrollReveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            align="center"
            id="reviews-heading"
            className="mb-14"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <ScrollReveal key={review.name} delay={i * 0.1}>
              <article
                className={[
                  "flex flex-col gap-4 h-full",
                  "bg-seaglass rounded-lg p-7",
                  "border border-ink/5",
                  "shadow-sm",
                ].join(" ")}
                aria-label={`Review by ${review.name}`}
              >
                {/* Stars */}
                <div className="flex gap-1" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-sun text-sun"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Review text */}
                <p className="font-body text-sm font-light leading-relaxed text-ink/70 flex-1 italic">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Author */}
                <div className="border-t border-ink/10 pt-4 flex items-center gap-3">
                  {/* Avatar placeholder — initials */}
                  <div
                    className="h-9 w-9 rounded-full bg-deep-sea/10 flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    <span className="font-mono text-xs font-medium text-deep-sea">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-ink">
                      {review.name}
                    </p>
                    <p className="font-mono text-[0.6rem] tracking-widest uppercase text-ink/40">
                      {review.origin}
                    </p>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

      </Container>
    </section>
  );
}
