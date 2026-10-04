import ThemeToggle from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <>
      <ThemeToggle showText={false} />
      <h1>Hello</h1>
      <Button>Click me</Button>
    </>
  );
};
export default Home;
