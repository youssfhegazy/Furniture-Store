import { TopBar } from "@/components/site/top-bar";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { FeatureBar } from "@/components/site/feature-bar";
import { BrandStrip } from "@/components/site/brand-strip";
import { Collections } from "@/components/site/collections";
import { FeaturedCategories } from "@/components/site/featured-categories";
import { TrendingProducts } from "@/components/site/trending-products";
import { FlashSale } from "@/components/site/flash-sale";
import { Offers } from "@/components/site/offers";
import { Testimonials } from "@/components/site/testimonials";
import { Blog } from "@/components/site/blog";
import { Faq } from "@/components/site/faq";
import { Newsletter } from "@/components/site/newsletter";
import { NewsletterPopup } from "@/components/site/newsletter-popup";
import { Footer } from "@/components/site/footer";
import { getProducts, getTestimonials, getFaqs } from "@/lib/queries";

export default async function Home() {
  const [products, testimonials, faqs] = await Promise.all([
    getProducts(),
    getTestimonials(),
    getFaqs(),
  ]);

  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <Hero />
        <FeatureBar />
        <BrandStrip />
        <Collections />
        {/* <FeaturedCategories /> */}
        <TrendingProducts products={products} />
        <FlashSale />
        <Offers />
        <Testimonials testimonials={testimonials} />
        <Blog />
        <Faq faqs={faqs} />
        <Newsletter />
      </main>
      <Footer />
      <NewsletterPopup />
    </>
  );
}
