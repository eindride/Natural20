const TITLE = 'title';
const SUBTITLE = 'subtitle';
const PARAGRAPH = 'paragraph';
const LIST = 'list';

export const officialClasses = ['barbarian', 'bard', 'cleric', 'druid', 'fighter', 'monk', 'paladin', 'ranger', 'rogue', 'sorcerer', 'warlock', 'wizard'];

export const dummyContent = [
	{
		type: TITLE,
		content: 'This is a title',
	},
	{
		type: PARAGRAPH,
		content: 'Bacon ipsum dolor amet turducken ribeye pork belly kielbasa tri-tip. Sausage alcatra buffalo porchetta tenderloin tri-tip shank bresaola corned beef. Sirloin jerky porchetta, salami alcatra filet mignon kielbasa bacon leberkas spare ribs ham hock. Sirloin prosciutto bacon, meatloaf kielbasa salami ham jowl rump pork beef ribs shankle shoulder. Doner brisket strip steak meatloaf, sausage picanha jerky beef ribs alcatra pancetta ribeye tongue biltong kielbasa. Tri-tip spare ribs brisket pork chop, doner hamburger pastrami biltong frankfurter venison beef. Cow beef pig jowl pastrami picanha buffalo short loin pork t-bone.',
	},
	{
		type: SUBTITLE,
		content: 'A Subtitle',
	},
	{
		type: PARAGRAPH,
		content: 'Pork belly corned beef pig, turkey andouille beef sirloin turducken tongue tail. Landjaeger sirloin short loin leberkas pork, shank kevin tail. Jowl pig tri-tip pork chop tail prosciutto leberkas. Turkey andouille venison, doner pancetta hamburger short ribs pork belly kielbasa. Chicken ham hock pork swine frankfurter biltong shoulder jerky meatloaf tongue alcatra filet mignon beef ribs ribeye.',
	},
	{
		type: LIST,
		content: [
			{
				title: 'Bacon.',
				content: 'Kevin shankle porchetta bresaola fatback, shank andouille ribeye beef short loin doner. Pastrami drumstick tongue landjaeger chuck prosciutto. Cupim hamburger strip steak, ribeye leberkas biltong filet mignon tongue fatback meatball corned beef swine shoulder porchetta. Chicken pancetta pig buffalo landjaeger picanha frankfurter t-bone short loin.',
			},
			{
				title: 'Bacon.',
				content: 'Kevin shankle porchetta bresaola fatback, shank andouille ribeye beef short loin doner. Pastrami drumstick tongue landjaeger chuck prosciutto. Cupim hamburger strip steak, ribeye leberkas biltong filet mignon tongue fatback meatball corned beef swine shoulder porchetta. Chicken pancetta pig buffalo landjaeger picanha frankfurter t-bone short loin.',
			},
		],
	}
];
