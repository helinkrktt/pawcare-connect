
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LogIn, Check, PawPrint } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    
    // Simulate login - in a real app this would call a backend API
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Giriş başarılı");
      navigate("/dashboard");
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
            <h1 className="text-3xl font-bold text-center mb-2">Hesabınıza Giriş Yapın</h1>
            <p className="text-muted-foreground text-center">
              PawCare ile evcil hayvanlarınızın sağlık takibini kolayca yapın
            </p>
          </div>

          <div className="bg-card border rounded-lg shadow-sm p-6">
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
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Şifre</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="••••••••" 
                          type="password" 
                          autoComplete="current-password"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="remember" 
                      className="h-4 w-4 rounded border-gray-300 text-pawcare-600 focus:ring-pawcare-500"
                    />
                    <label htmlFor="remember" className="text-sm text-muted-foreground">
                      Beni Hatırla
                    </label>
                  </div>
                  <Link to="/forgot-password" className="text-sm text-pawcare-600 hover:text-pawcare-500">
                    Şifremi Unuttum
                  </Link>
                </div>

                <Button 
                  type="submit" 
                  className="w-full btn-shine flex items-center justify-center gap-2" 
                  disabled={isLoading}
                  size="lg"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <LogIn className="h-5 w-5" />
                  )}
                  Giriş Yap
                </Button>
              </form>
            </Form>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Henüz hesabınız yok mu?{" "}
                <Link to="/register" className="text-pawcare-600 hover:text-pawcare-500 font-medium">
                  Kaydol
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Check className="h-4 w-4 text-green-500" />
            <span>Güvenli ve korumalı giriş</span>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
