
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

export default function SimpleBadge({badgeContent}) {
  return (
    <Badge className='mt-2'  badgeContent={badgeContent} color="primary">
      <MailIcon color="action" />
    </Badge>
  );
}