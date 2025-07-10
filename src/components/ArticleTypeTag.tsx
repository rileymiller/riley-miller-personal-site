import { toast } from 'sonner';
import styles from './ArticleTypeTag.module.css';

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

  const isSnack = articleType.toLowerCase() === 'snack';

  if (isSnack) {
    return (
      <span className={styles.shinyWrapper}>
        <span
          className={`${className} cursor-pointer select-none block`}
          onClick={handleClick}
          style={{ borderRadius: '4px' }}
        >
          {articleType}
        </span>
      </span>
    );
  }

  return (
    <span
      className={`${className} cursor-pointer select-none`}
      onClick={handleClick}
    >
      {articleType}
    </span>
  );
}