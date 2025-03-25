
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { KeyRound, ArrowLeft, PawPrint } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const forgotPasswordSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: ForgotPasswordFormValues) {
    setIsLoading(true);
    
    // Simulate API call - in a real app this would call a backend API
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast.success("Şifre sıfırlama bağlantısı gönderildi");
    }, 1500);
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-md mx-auto px-4">
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-2">
              <PawPrint className="h-14 w-14 text-pawcare-600" strokeWidth={2.5} />
              <div className="absolute inset-0 bg-pawcare-500/20 rounded-full blur-lg -z-10"></div>
            </div>
            <h1 className="text-3xl font-bold text-center mb-2">Şifrenizi mi Unuttunuz?</h1>
            <p className="text-muted-foreground text-center">
              Endişelenmeyin, şifrenizi sıfırlamak için e-posta adresinizi girin
            </p>
          </div>

          <div className="bg-card border rounded-lg shadow-sm p-6">
            {!isSubmitted ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-posta Adresi</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="ornek@email.com" 
                            type="email" 
                            autoComplete="email"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full btn-shine flex items-center justify-center gap-2" 
                    disabled={isLoading}
                    size="lg"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <KeyRound className="h-5 w-5" />
                    )}
                    Şifre Sıfırlama Bağlantısı Gönder
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="text-center py-4">
                <div className="bg-green-50 text-green-800 p-4 rounded-md mb-6">
                  <h3 className="font-medium">E-posta Gönderildi</h3>
                  <p className="text-sm mt-1">
                    Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. 
                    Lütfen gelen kutunuzu kontrol edin.
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsSubmitted(false);
                    form.reset();
                  }}
                  className="w-full"
                >
                  Farklı bir e-posta adresi deneyin
                </Button>
              </div>
            )}

            <div className="mt-8">
              <Link 
                to="/login" 
                className="inline-flex items-center text-pawcare-600 hover:text-pawcare-500 text-sm font-medium"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Giriş sayfasına dön
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
