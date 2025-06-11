import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className=" py-8">
      <section className="sm:mx-40 mx-10 py-12 md:py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-heading mb-6">
          Siapakah Tim Sukses itu?
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          kami merupakan sebuah kelompok kecil yang berdedikasi dalam
          mengembangkan aplikasi web berbasis kecerdasan buatan. Kami memiliki
          kompetensi dan pengalaman yang mendukung dalam mengembangkan proyek
          ini.
        </p>
      </section>

      {/* Our Story */}
      <section className=" sm:mx-40 mx-10 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-heading mb-6">Cerita dari kami</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Proyek ini bertujuan untuk membangun sebuah aplikasii web
                berbasis kecerdasan buatan yang memilikii kemampuan untuk
                melakukan peringkasan, serta memberikan pertanyaan dalam bentuk
                teks secara otomatis. latar belakang dari proyek kami ini
                berasal dari kebutuhan pelajar dan masyarakat umuk untuk
                memahami teks panjang dengan lebih efisien. Aplikasi ini
                ditargetkan untuk orang yang memiliki keterbatasan kemampuan
                dalam mencerna informasi panjang dan orang dengan keterbatasan
                waktu untuk mencerna informasi dari teks panjang.
              </p>
              <p>
                Rencana dari pelaksanaan projek ini terbagi menjadi beberapa
                tahap utama yaitu, pengembangan frontend, pengembangan backend
                untuk AI, pengembangan backend untuk aplikasi utama, dan juga
                backend untuk integrasi Machine Learnings. Kami mengusahakan
                kemudahan dalam pemakaian pada aplikasi kami sehingga aplikasi
                ini mudah diakses oleh semua orang, dan tidak perlu login untuk
                bisa menggunakan aplikasi kami. Evaluasi hasil ringkasan akan
                dilakukan dengan cara membandingkan hasil ringkasan dengan teks
                sebenarnya.
              </p>
              <p>
                Hasil askhir yang kami harapkan adalah sebuah aplikasi web yang
                dapat membantu proses belajar atau memahami informasi dari teks,
                terutama pada kalangan pelajar, pendidik, atau bahkan pengguna
                umum. Dengan hadirnya produk kami ini, kami berharap supaya
                menjadi langkah awal dalam mendorong AI yang bermanfaat serta
                berdampak nyata bagi pendidikan yang lebih merata dan mudah
                diakses.
              </p>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px] bg-muted rounded-lg overflow-hidden">
            <Image
              src="/students.jpg"
              alt="Team"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-muted/50">
        <div className="sm:mx-40 mx-10">
          <h2 className="text-3xl font-heading text-center mb-12"></h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Hemat Waktu</h3>
                <p className="text-muted-foreground">
                  Tidak perlu membaca teks panjang sehingga menghemat waktu dan
                  tenaga
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">
                  Belajar Cepat dan Tepat
                </h3>
                <p className="text-muted-foreground">
                  Buat informasi kompleks-mu menjadi lebih mudah dicerna,
                  sehingga lebih sederhana dan cepat.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Ilmu Terbuka</h3>
                <p className="text-muted-foreground">
                  Informasi yang sudah dikumpulkan dapat diakses oleh siapapun
                  dan di mana pun tanpa adanya rahasia
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 md:py-20">
        <h2 className="text-3xl font-heading text-center mb-12">Dari Kami</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "Ezra Raditya",
              role: "Fullstack developer",
            },
            {
              name: "Muhammad haikal",
              role: "Backend Engineer",
            },
            {
              name: "Gregorius Kevin",
              role: "backend Engineer",
            },
            {
              name: "Meilani Kizana",
              role: "AI Engineer",
            },
            {
              name: "Jesica Febiola",
              role: "AI Engineer",
            },
            {
              name: "fransiska Artha",
              role: "AI Engineer",
            },
          ].map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-32 h-32 bg-muted rounded-full mb-4 flex items-center justify-center text-muted-foreground">
                <span>Photo</span>
              </div>
              <h3 className="text-lg font-medium">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 md:py-20 bg-muted/50">
        <div className="sm:mx-40 mx-10">
          <h2 className="text-3xl font-heading text-center mb-12">
            Keunggulan Kami
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: "User-Centered",
                description:
                  "kami berkomitmen untuk memahami kebutuhan pengguna dan memberikan solusi yang sesuai.",
              },
              {
                title: "Innovation",
                description:
                  "kami berkomitmen untuk selalu menghadirkan solusi baru dan teknologi terbaru dalam pengembangan aplikasi kami.",
              },
              {
                title: "Transparency",
                description:
                  "kami menjaga transparansi dalam pengembangan aplikasi kami, sehingga pengguna dapat memahami bagaimana aplikasi kami bekerja.",
              },
              {
                title: "Accessibility",
                description:
                  "kami berkomitmen untuk membuat aplikasi kami dapat diakses oleh semua orang, termasuk orang dengan keterbatasan kemampuan teknologi.",
              },
            ].map((value, index) => (
              <div key={index} className="flex gap-4">
                <div className="rounded-full bg-primary/10 p-2 h-8 w-8 flex items-center justify-center mt-1">
                  <span className="text-primary font-medium">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 text-center">
        <h2 className="text-3xl font-heading mb-6">
          Siap Melangkah bersama BrevityAI?
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Ikuti langkah para pengguna kami yang sudah menyimpan waktu mereka
          dengan menggunakan AI kami
        </p>
        <Button size="lg" asChild>
          <Link href="/app">
            Mulai Gratis <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
