import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { 
  TitleCard, 
  CommunityChildcareCard, 
  ChildrenGroupCard, 
  ActivitiesCard, 
  YouthGroupCard, 
  ParentsInfoCard 
} from '../../components/children/children-group-card';

describe('Community Components', () => {
  it('renders TitleCard correctly', () => {
    const pageTitle = 'Welcome to Our Community!';
    render(<TitleCard pageTitle={pageTitle} />);
    expect(screen.getByText(pageTitle)).toBeInTheDocument();
  });

  it('renders CommunityChildcareCard correctly', () => {
    const props = {
      imageUrl: '/images/community-childcare.jpg',
      altText: 'Community Childcare',
      title: 'Community Childcare Program',
      subtitle: 'Supporting Families and Children',
      description: 'Our childcare program provides a safe and nurturing environment for children to learn and grow.',
    };

    render(<CommunityChildcareCard {...props} />);
    expect(screen.getByAltText(props.altText)).toHaveAttribute('src', props.imageUrl);
    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.subtitle)).toBeInTheDocument();
    expect(screen.getByText(props.description)).toBeInTheDocument();
  });

  it('renders ChildrenGroupCard with its programs correctly', () => {
    const props = {
      pageTitle: 'Children Group Programs',
      childcareInfoTitle: 'Childcare Information',
      childcareInfoDescription: 'We offer various programs to support children’s early development.',
      costTitle: 'Program Costs',
      costDescription: 'Our programs are affordable and accessible to all families.',
      program1Title: 'Possum Group',
      program1Description: 'A program focused on learning through play for younger children.',
      program2Title: 'Koala Group',
      program2Description: 'Designed to support children as they prepare for school.',
    };

    render(<ChildrenGroupCard {...props} />);
    expect(screen.getByText(props.childcareInfoTitle)).toBeInTheDocument();
    expect(screen.getByText(props.childcareInfoDescription)).toBeInTheDocument();
    expect(screen.getByText(props.costTitle)).toBeInTheDocument();
    expect(screen.getByText(props.costDescription)).toBeInTheDocument();

    // Check the individual program cards
    expect(screen.getByText(props.program1Title)).toBeInTheDocument();
    expect(screen.getByText(props.program1Description)).toBeInTheDocument();
    expect(screen.getByText(props.program2Title)).toBeInTheDocument();
    expect(screen.getByText(props.program2Description)).toBeInTheDocument();
  });

  it('renders ActivitiesCard with multiple activities correctly', () => {
    const props = {
      activity1Title: 'Outdoor Play',
      activity1Description: 'Fun outdoor activities to keep children active and engaged.',
      activity2Title: 'Art & Craft',
      activity2Description: 'Creative sessions to help children express themselves through art.',
    };

    render(<ActivitiesCard {...props} />);
    expect(screen.getByText(props.activity1Title)).toBeInTheDocument();
    expect(screen.getByText(props.activity1Description)).toBeInTheDocument();
    expect(screen.getByText(props.activity2Title)).toBeInTheDocument();
    expect(screen.getByText(props.activity2Description)).toBeInTheDocument();
  });

  it('renders YouthGroupCard correctly', () => {
    const props = {
      imageUrl1: '/images/youth-group.jpg',
      altText1: 'Youth Group',
      infoTitle: 'Youth Group Program',
      infoDescription: 'Our youth group program helps young people build connections and develop new skills.',
    };

    render(<YouthGroupCard {...props} />);
    expect(screen.getByAltText(props.altText1)).toHaveAttribute('src', props.imageUrl1);
    expect(screen.getByText(props.infoTitle)).toBeInTheDocument();
    expect(screen.getByText(props.infoDescription)).toBeInTheDocument();
  });

  it('renders ParentsInfoCard with links correctly', () => {
    const props = {
      information1title: 'Parenting Tips',
      information1link: '/parenting-tips',
      information2title: 'Community Resources',
      information2link: '/community-resources',
      information3title: 'Support Services',
      information3link: '/support-services',
    };

    render(<ParentsInfoCard {...props} />);

    // Query the anchor elements directly instead of using the text within the <p> tags
    const link1 = screen.getByRole('link', { name: props.information1title });
    const link2 = screen.getByRole('link', { name: props.information2title });
    const link3 = screen.getByRole('link', { name: props.information3title });

    expect(link1).toHaveAttribute('href', props.information1link);
    expect(link2).toHaveAttribute('href', props.information2link);
    expect(link3).toHaveAttribute('href', props.information3link);
  });
});