import { toast } from 'sonner';

interface ArticleTypeTagProps {
  articleType: string;
  className?: string;
}

export function ArticleTypeTag({ articleType, className = '' }: ArticleTypeTagProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.info('What is a snack?', {
      description: 'A snack is a short, quick-to-read post that doesn\'t quite warrant a full blog post. Perfect for quick tips, snippets, or brief thoughts!',
      duration: 5000,
    });
  };

  return (
    <span
      className={`${className} cursor-pointer select-none`}
      onClick={handleClick}
    >
      {articleType}
    </span>
  );
}