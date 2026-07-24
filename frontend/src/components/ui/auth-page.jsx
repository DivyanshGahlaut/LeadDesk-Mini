import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './button';
import { Input } from './input';
import {
	Apple,
	AtSign,
	ChevronLeft,
	Github,
	LayoutGrid,
	Lock,
	AlertCircle,
	KeyRound
} from 'lucide-react';
import { loginAdmin } from '@/api/client';

export function AuthPage({ onLoginSuccess, onGoHome }) {
	const [email, setEmail] = useState('admin@leaddesk.com');
	const [password, setPassword] = useState('admin123');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		if (!email || !password) {
			setError('Please enter both email and password.');
			return;
		}

		setIsLoading(true);
		try {
			await loginAdmin(email, password);
			if (onLoginSuccess) onLoginSuccess();
		} catch (err) {
			setError(err.message || 'Invalid login credentials. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	const fillDemoAdmin = () => {
		setEmail('admin@leaddesk.com');
		setPassword('admin123');
		setError('');
	};

	return (
		<main className="relative min-h-screen lg:h-screen lg:overflow-hidden lg:grid lg:grid-cols-2 bg-[#020408] text-slate-100">
			{/* Left Column - 3D Animated Background */}
			<div className="bg-slate-950/90 relative hidden h-full flex-col border-r border-white/10 p-10 lg:flex overflow-hidden">
				<div className="from-[#020408] absolute inset-0 z-10 bg-gradient-to-t via-transparent to-transparent pointer-events-none" />
				<div className="z-10 flex items-center gap-3">
					<div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-[1px] shadow-lg shadow-blue-500/30">
						<div className="w-full h-full bg-[#070b14] rounded-[15px] flex items-center justify-center">
							<LayoutGrid className="size-5 text-blue-400" />
						</div>
					</div>
					<div className="flex items-center gap-2">
						<p className="text-2xl font-black tracking-tight text-white">LeadDesk</p>
						<span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30">
							Mini CRM
						</span>
					</div>
				</div>

				<div className="absolute inset-0 pointer-events-none">
					<FloatingPaths position={1} />
					<FloatingPaths position={-1} />
				</div>
			</div>

			{/* Right Column - Auth Form */}
			<div className="relative flex min-h-screen flex-col justify-center p-6 sm:p-12 lg:p-16 bg-[#020408]">
				<div
					aria-hidden
					className="absolute inset-0 isolate contain-strict -z-10 opacity-60 pointer-events-none"
				>
					<div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(59,130,246,0.18)_0,rgba(2,4,8,0)_80%)] absolute top-0 right-0 h-[600px] w-[500px] -translate-y-1/2 rounded-full blur-3xl" />
				</div>

				<Button
					variant="ghost"
					className="absolute top-6 left-6 text-slate-400 hover:text-white hover:bg-white/5 border border-white/5 rounded-xl"
					onClick={onGoHome}
				>
					<ChevronLeft className="size-4 me-2" />
					Public Site
				</Button>

				<div className="mx-auto space-y-6 w-full max-w-sm">
					<div className="flex items-center gap-2 lg:hidden mb-2">
						<LayoutGrid className="size-6 text-blue-400" />
						<p className="text-xl font-bold text-white">LeadDesk Mini</p>
					</div>

					<div className="flex flex-col space-y-1">
						<h1 className="text-3xl font-extrabold tracking-tight text-white">
							Sign In to Admin
						</h1>
						<p className="text-slate-400 text-sm">
							Login to your LeadDesk Mini CRM account.
						</p>
					</div>

					{error && (
						<div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-fade-in shadow-lg">
							<AlertCircle className="size-4 text-rose-400 shrink-0" />
							<span>{error}</span>
						</div>
					)}

					<div className="space-y-2.5">
						<Button type="button" variant="outline" size="lg" className="w-full justify-start text-xs font-semibold" onClick={fillDemoAdmin}>
							<GoogleIcon className="size-4 me-3 text-slate-300" />
							Continue with Google (Demo Auto-Fill)
						</Button>
						<Button type="button" variant="outline" size="lg" className="w-full justify-start text-xs font-semibold" onClick={fillDemoAdmin}>
							<Apple className="size-4 me-3 text-slate-300" />
							Continue with Apple (Demo Auto-Fill)
						</Button>
						<Button type="button" variant="outline" size="lg" className="w-full justify-start text-xs font-semibold" onClick={fillDemoAdmin}>
							<Github className="size-4 me-3 text-slate-300" />
							Continue with GitHub (Demo Auto-Fill)
						</Button>
					</div>

					<AuthSeparator />

					<form onSubmit={handleSubmit} className="space-y-4">
						<p className="text-slate-400 text-xs">
							Enter your admin credentials to sign in
						</p>

						<div>
							<div className="relative">
								<Input
									placeholder="admin@leaddesk.com"
									className="ps-9 bg-slate-950/90 border-white/15 focus:border-blue-500 text-sm"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
								<div className="text-slate-400 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3">
									<AtSign className="size-4" aria-hidden="true" />
								</div>
							</div>
						</div>

						<div>
							<div className="relative">
								<Input
									placeholder="••••••••"
									className="ps-9 bg-slate-950/90 border-white/15 focus:border-blue-500 text-sm"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
								<div className="text-slate-400 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3">
									<KeyRound className="size-4" aria-hidden="true" />
								</div>
							</div>
						</div>

						<Button type="submit" size="lg" disabled={isLoading} className="w-full font-bold shadow-lg shadow-blue-600/30">
							{isLoading ? (
								<span className="flex items-center gap-2">
									<span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
									Authenticating...
								</span>
							) : (
								<span>Continue With Email</span>
							)}
						</Button>
					</form>

					<p className="text-slate-500 text-xs text-center">
						By clicking continue, you agree to our{' '}
						<a href="#" className="hover:text-slate-300 underline underline-offset-4">
							Terms of Service
						</a>{' '}
						and{' '}
						<a href="#" className="hover:text-slate-300 underline underline-offset-4">
							Privacy Policy
						</a>
						.
					</p>
				</div>
			</div>
		</main>
	);
}

function FloatingPaths({ position }) {
	const paths = Array.from({ length: 36 }, (_, i) => ({
		id: i,
		d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
			380 - i * 5 * position
		} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
			152 - i * 5 * position
		} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
			684 - i * 5 * position
		} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
		color: `rgba(59,130,246,${0.1 + i * 0.02})`,
		width: 0.5 + i * 0.03,
	}));

	return (
		<div className="pointer-events-none absolute inset-0">
			<svg
				className="h-full w-full text-blue-500/20"
				viewBox="0 0 696 316"
				fill="none"
			>
				<title>Background Paths</title>
				{paths.map((path) => (
					<motion.path
						key={path.id}
						d={path.d}
						stroke="currentColor"
						strokeWidth={path.width}
						strokeOpacity={0.15 + path.id * 0.02}
						initial={{ pathLength: 0.3, opacity: 0.6 }}
						animate={{
							pathLength: 1,
							opacity: [0.3, 0.7, 0.3],
							pathOffset: [0, 1, 0],
						}}
						transition={{
							duration: 18 + Math.random() * 8,
							repeat: Number.POSITIVE_INFINITY,
							ease: 'linear',
						}}
					/>
				))}
			</svg>
		</div>
	);
}

const GoogleIcon = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		{...props}
	>
		<g>
			<path d="M12.479,14.265v-3.279h11.049c0.108,0.571,0.164,1.247,0.164,1.979c0,2.46-0.672,5.502-2.84,7.669   C18.744,22.829,16.051,24,12.483,24C5.869,24,0.308,18.613,0.308,12S5.869,0,12.483,0c3.659,0,6.265,1.436,8.223,3.307L18.392,5.62   c-1.404-1.317-3.307-2.341-5.913-2.341C7.65,3.279,3.873,7.171,3.873,12s3.777,8.721,8.606,8.721c3.132,0,4.916-1.258,6.059-2.401   c0.927-0.927,1.537-2.251,1.777-4.059L12.479,14.265z" />
		</g>
	</svg>
);

const AuthSeparator = () => {
	return (
		<div className="flex w-full items-center justify-center my-3">
			<div className="bg-white/10 h-px w-full" />
			<span className="text-slate-500 px-3 text-xs font-semibold">OR</span>
			<div className="bg-white/10 h-px w-full" />
		</div>
	);
};
