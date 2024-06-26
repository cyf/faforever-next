"use client";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { RoughNotation } from "react-rough-notation";
import { FaBlog } from "react-icons/fa";
import Image from "next/image";
import GitHubRelease from "@/components/home/github-release";
import { useTranslation } from "@/i18n/client";
import { allPosts } from "contentlayer/generated";
import { basePath } from "@/constants";

export default function Home({
  params,
}: {
  params: {
    lng: string;
  };
}) {
  const { t } = useTranslation(params.lng, "header");

  const post = allPosts
    .filter((post) => post.slug.startsWith(`${params.lng}/blog`))
    .sort((a, b) => {
      return new Date(a.publishedAt) > new Date(b.publishedAt) ? -1 : 1;
    })
    .at(0);

  return (
    <>
      <div className="w-full max-w-xl px-5 xl:px-0">
        {post && (
          <Link
            href={`/${post.slug}`}
            rel="noreferrer"
            className="mx-auto mb-12 flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full bg-[#0a60ff] bg-opacity-10 px-7 py-2 text-[#0a60ff] transition-colors hover:bg-opacity-20 dark:bg-opacity-20 dark:hover:bg-opacity-30"
          >
            <FaBlog className="h-5 w-5" />
            <p className="text-sm font-semibold">{post.title}</p>
          </Link>
        )}
        <div className="mb-8 flex items-center justify-center space-x-20">
          <Image
            className="rounded-full"
            alt="logo"
            src={`${basePath}/logo.png`}
            width={160}
            height={160}
          />
        </div>
        <h1
          className="font-display animate-fade-up bg-clip-text text-center text-4xl font-bold tracking-[-0.02em] text-black/80 opacity-0 drop-shadow-sm dark:text-white/80 md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer>{t("title")}</Balancer>
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-[#0a60ff] opacity-0 md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <Balancer>
            <RoughNotation
              animate
              type="highlight"
              show={true}
              color="#f1f2f6"
              animationDelay={1000}
              animationDuration={2500}
            >
              一个可以听发姐音乐的桌面客户端.
            </RoughNotation>
          </Balancer>
        </p>
      </div>
      <GitHubRelease lng={params.lng} />
    </>
  );
}
