
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UserPlus, Check, PawPrint } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const registerSchema = z.object({
  name: z.string().min(2, "Ad en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
  confirmPassword: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Şifreler eşleşmiyor",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);
    
    // Simulate registration - in a real app this would call a backend API
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Kayıt başarılı");
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
            <h1 className="text-3xl font-bold text-center mb-2">Hesap Oluşturun</h1>
            <p className="text-muted-foreground text-center">
              Evcil hayvanlarınızın sağlık takibini yapmak için hemen kaydolun
            </p>
          </div>

          <div className="bg-card border rounded-lg shadow-sm p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ad Soyad</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Adınız Soyadınız" 
                          autoComplete="name"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
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
                          autoComplete="new-password"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Şifre Tekrarı</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="••••••••" 
                          type="password" 
                          autoComplete="new-password"
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
                    <UserPlus className="h-5 w-5" />
                  )}
                  Kaydol
                </Button>
              </form>
            </Form>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Zaten hesabınız var mı?{" "}
                <Link to="/login" className="text-pawcare-600 hover:text-pawcare-500 font-medium">
                  Giriş Yap
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Check className="h-4 w-4 text-green-500" />
            <span>Bilgileriniz güvende ve korumalıdır</span>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
