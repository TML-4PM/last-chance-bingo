// In pages/index.tsx, within your render method:
<label htmlFor="email" className="block font-medium text-lg">Enter Email to Pre-fill:</label>
<input
  type="email"
  id="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full md:w-1/2 p-4 border rounded text-lg"
  aria-label="Email Input"
/>
