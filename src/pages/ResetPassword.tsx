
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type FormValues = z.infer<typeof formSchema>;

const ResetPassword = () => {
  const { resetPassword, loading } = useAuth();
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setError(null);
      await resetPassword(values.email);
      setSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  if (success) {
    return (
      <Card className="border-border/40 shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
          <CardDescription>
            We've sent you a password reset link. Please check your email to reset your password.
          </CardDescription>
        </CardHeader>
        <CardFooter className="pt-0">
          <Button asChild variant="outline" className="w-full">
            <Link to="/auth/login">Back to login</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="border-border/40 shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Reset password</CardTitle>
        <CardDescription>Enter your email to reset your password</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Sending instructions...' : 'Send reset instructions'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center p-6 pt-0">
        <div className="text-sm text-muted-foreground">
          Remember your password?{' '}
          <Link to="/auth/login" className="hover:text-primary underline underline-offset-4">
            Back to login
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ResetPassword;
