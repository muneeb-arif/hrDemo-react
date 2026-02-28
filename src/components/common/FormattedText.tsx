import React from 'react';
import { Typography, Box } from '@mui/material';

interface FormattedTextProps {
  text: string;
}

/**
 * Component to render text with markdown-like formatting:
 * - ### text -> h3 heading
 * - **text** -> bold text
 */
const FormattedText: React.FC<FormattedTextProps> = ({ text }) => {
  const parseText = (input: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];

    // First, handle h3 headings (they should be on their own line)
    const lines = input.split('\n');
    
    lines.forEach((line, lineIndex) => {
      const h3Match = line.match(/^###\s+(.+)$/);
      
      if (h3Match) {
        // Add h3 heading
        parts.push(
          <Typography
            key={`h3-${lineIndex}`}
            variant="h3"
            component="h6"
            sx={{ mt: lineIndex > 0 ? 2 : 0, mb: 1, fontWeight: 600, fontSize: '1.25rem' }}
          >
            {h3Match[1]}
          </Typography>
        );
      } else if (line.trim()) {
        // Process line for bold text and regular text
        const lineParts: React.ReactNode[] = [];
        let lastIndex = 0;
        const boldRegex = /\*\*(.+?)\*\*/g;
        let match;

        while ((match = boldRegex.exec(line)) !== null) {
          // Add text before bold
          if (match.index > lastIndex) {
            lineParts.push(
              <React.Fragment key={`text-${lineIndex}-${lastIndex}`}>
                {line.substring(lastIndex, match.index)}
              </React.Fragment>
            );
          }
          
          // Add bold text
          lineParts.push(
            <strong key={`bold-${lineIndex}-${match.index}`}>
              {match[1]}
            </strong>
          );
          
          lastIndex = match.index + match[0].length;
        }
        
        // Add remaining text
        if (lastIndex < line.length) {
          lineParts.push(
            <React.Fragment key={`text-${lineIndex}-${lastIndex}`}>
              {line.substring(lastIndex)}
            </React.Fragment>
          );
        }
        
        // If no bold text found, just add the line as-is
        if (lineParts.length === 0) {
          lineParts.push(
            <React.Fragment key={`text-${lineIndex}`}>
              {line}
            </React.Fragment>
          );
        }
        
        parts.push(
          <Typography
            key={`line-${lineIndex}`}
            variant="body2"
            component="p"
            sx={{ mb: 1, whiteSpace: 'pre-wrap' }}
          >
            {lineParts}
          </Typography>
        );
      } else {
        // Empty line - add spacing
        parts.push(<br key={`br-${lineIndex}`} />);
      }
    });

    return parts;
  };

  return (
    <Box sx={{ fontFamily: '"Open Sans", sans-serif' }}>
      {parseText(text)}
    </Box>
  );
};

export default FormattedText;
