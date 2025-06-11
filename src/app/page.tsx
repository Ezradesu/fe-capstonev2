import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Clock, BarChart2, Users, Zap } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className=" flex flex-col min-h-[calc(100vh-64px)]">
      <section className="flex-1 py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary/10 to-background">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-heading tracking-tighter">
              Ringkas sekarang belajar kemudian
            </h1>
            <p className="text-xl text-muted-foreground max-w-[600px] mx-auto">
              Belajar cepat dan libeh efisien dengan AI yang kami kembangkan
              merubah teks panjang kamu menjadi lebih ringkas.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/summarize">
                Coba gratis <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Baca lebih lanjut</Link>
            </Button>
          </div>

          <div className="relative w-full max-w-3xl h-[300px] md:h-[400px] mt-12 border rounded-lg overflow-hidden">
            <Image
              src="/notebook.jpg"
              alt="Hero"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-muted/50">
        <div className="sm:mx-40 mx-10">
          <div className="text-center max-w-[600px] mx-auto mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-heading tracking-tighter">
              Key Features
            </h2>
            <p className="text-muted-foreground">
              AI peringkas teks kami memiliki beberapa fitur yang dapat membantu
              kamu untuk mencerna informasi dengan lebih cepat dan efisien.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <Card className="hover:scale-105 duration-75 ease-in">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">
                  Intelligent Summarization
                </h3>
                <p className="text-muted-foreground">
                  AI yang kami kembangkan mengerti konteks serta poin penting
                  untuk membuat ringkasan yang akurat dan singkat.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:scale-105 duration-75 ease-in">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Save Time</h3>
                <p className="text-muted-foreground">
                  Simpan waktu membacamu dan kami akan fokuskan pada apa yang
                  penting.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:scale-105 duration-75 ease-in">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <BarChart2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">
                  Customizable Length
                </h3>
                <p className="text-muted-foreground">
                  Choose how detailed or concise you want your summaries to be.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:scale-105 duration-75 ease-in">
              <CardContent className="pt-6">
                <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Open Publicly</h3>
                <p className="text-muted-foreground">
                  Setiap ringkasan merupakan ilmu yang harus dibagikan.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-12 md:py-24">
        <div className="">
          <div className="bg-primary/10 rounded-lg px-6 py-12 md:p-12 flex flex-col items-center text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-heading tracking-tighter">
              Mulai meringkas hari ini
            </h2>
            <p className="text-muted-foreground max-w-[600px]">
              Ikuti langkah para pengguna yang sudah menyimpan waktu mereka
              dengan menggunakan AI kami
            </p>
            <Button
              size="lg"
              className="hover:scale-105 duration-75 ease-in"
              asChild
            >
              <Link href="/summarize">Mulai gratis</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
