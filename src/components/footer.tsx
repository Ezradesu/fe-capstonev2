import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background border-t py-8 md:py-12">
      <div className=" sm:mx-40 mx-10 flex flex-col md:flex-row justify-between items-baseline">
        <div className="mb-4 md:mb-0">
          <h2 className="font-heading text-xl mb-2">BrevityAI</h2>
          <p className="text-sm text-muted-foreground max-w-sm">
            Belajar cepat dan lebih efisien dengan AI yang kami kembangkan
            merubah teks panjang kamu menjadi lebih ringkas.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
          <div className="space-y-2">
            <h3 className="font-medium mb-2">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/app"
                  className="text-muted-foreground hover:text-foreground"
                >
                  App
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  API
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium mb-2">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/feedback"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Feedback
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2 col-span-2 md:col-span-1">
            <h3 className="font-medium mb-2">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className=" sm:mx-40 mx-10 mt-8 pt-4 border-t text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center">
        <p>© {new Date().getFullYear()} BrevityAI. All rights reserved.</p>
        <div className="mt-4 md:mt-0 flex space-x-4">
          <Link href="#" className="hover:text-foreground">
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
