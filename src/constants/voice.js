export const ARE_REQUEST_STOPS =
	'are request stops, and passengers for these stations, should ask the conductor, to allow the train to stop, to allow them to alight.'
export const FIRST_CLASS_AVAILABLE =
	'First class accommodation is available on the train.'
export const SIX_ONE_O_ONE_SIX =
	"If you see something that doesn't look right, speak to staff, or text the british transport police, on 6 1 0 1 6, we'll sort it. See it, say it, sorted."

export const BICYCLE_SPACES =
	'Please be aware, that you can only bring a bicycle on this service, if you have booked beforehand.'

export const CATERING_FACILITIES = [
	{
		operator: 'Avanti West Coast',
		announcement:
			'You can find the shop onboard for delicious hot and cold refreshments',
	},
	{
		operator: 'CrossCountry',
		announcement: 'This train has onboard catering available',
	},
	{
		operator: 'Great Western Railway',
		announcement: 'Food and drink is available on the train',
	},
	{
		operator: 'LNER',
		announcement:
			'A buffet counter service of hot and cold snacks is available on the train',
	},
]

export const DEFAULT_FIRST_CLASS_LOCATION = [
	{ direction: 'Southbound', location: 'front', proximity: 'at' },
	{ direction: 'Northbound', location: 'rear', proximity: 'at' },
]

export const FIRST_CLASS_LOCATION = [
	{
		operator: 'Avanti West Coast',
		located: DEFAULT_FIRST_CLASS_LOCATION,
	},
	{
		operator: 'LNER',
		located: DEFAULT_FIRST_CLASS_LOCATION,
	},
	{
		operator: 'East Midlands Railway',
		located: [
			{
				direction: 'Northbound',
				location: 'front',
				proximity: 'towards',
			},
			{
				direction: 'Southbound',
				location: 'rear',
				proximity: 'towards',
			},
		],
	},
	{
		operator: 'Great Western Railway',
		located: DEFAULT_FIRST_CLASS_LOCATION,
	},
]

export const STATION_ANNOUNCIATIONS = [
	{ original: 'Bicester North', new: 'Bicester' },
	{ original: 'Cradley Heath', new: 'Crade-ley Heath' },
	{ original: 'Edinburgh Waverley', new: 'Edinburgh' },
	{ original: 'Gobowen', new: 'Gabow-en' },
	{ original: 'Reading', new: 'Redding' },
	{ original: 'Kirkby', new: 'Kirby' },
	{ original: 'Carnforth', new: 'Carnfurth' },
	{ original: 'Gloucester', new: 'Glosster' },
	{ original: 'Witton', new: 'Wit-ton' },
	{ original: 'Worcester Foregate Street', new: 'Wusster Foregate Street' },
	{ original: 'Worcester Shrub Hill', new: 'Wusster Shrub Hill' },
	{ original: 'Warwick', new: 'Wah-rick' },
	{ original: 'Warwick Parkway', new: 'Wah-rick Parkway' },
	{ original: 'Tame Bridge Parkway', new: 'Tamebridge Parkway' },
	{ original: 'Leicester', new: 'Lesster' },
	{ original: 'Pembrey & Burry Port', new: 'Pembrey & Berry Port' },
	{ original: 'Glasgow Central', new: 'Glasgo Central' },
	{ original: 'Glasgow Queen Street', new: 'Glasgo Queen Street' },
	{ original: 'Rowley Regis', new: 'Rouweley Ree-jizz' },
	{ original: 'Slough', new: 'Slou' },
	{ original: 'Slaithwaite', new: 'Slouwit' },
	{ original: 'West Ealing', new: 'WEST EELING!' },
	{ original: 'Theale', new: 'Feel' },
	{ original: 'Holyhead', new: 'Holly-head' },
	{ original: 'Metro Centre', new: 'Gateshead Metrocentre' },
	{ original: 'Morpeth', new: 'Morpeff' },
	{ original: 'Port Talbot Parkway', new: 'Port Tall-but Parkway' },
	{ original: 'Prudhoe', new: 'Prudha' },
	{ original: 'Pokesdown', new: 'Pokz-down for Boss-cum' },
	{ original: 'Helensburgh Central', new: 'Helensburgh' },
	{ original: 'Wythall', new: 'With-all' },
	{ original: 'Stratford Upon Avon', new: 'Stratford Upon Avan' },
	{ original: 'Wilmcote', new: 'Wilm-coat' },
	{ original: 'Wootton Wawen', new: 'Wootton Woah-win' },
	{ original: 'Edmonton Green', new: 'Edmunton Green' },
	{ original: 'Durham', new: 'Durram' },
	{ original: 'Shrewsbury', new: 'Shrose-bree' },
]

export const STATION_INFLECTIONS = ['Barrow in Furness', 'Exeter Central']

export const PLATFORM_ANNOUNCIATIONS = [
	{ original: '1', new: 'wann' },
	{ original: '13', new: 'furteen' },
	{ original: '16', new: 'cisteen' },
]

export const SUB_PLATFORM_ANNOUNCIATIONS = [
	{
		original: 'A',
		new: 'ey',
	},
	{ original: 'B', new: 'bey' },
	{ original: 'C', new: 'sea' },
]
