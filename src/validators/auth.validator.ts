import { body } from 'express-validator';
import { userRoles } from '../models/pg/users.model';

export const loginValidator = [
    body('email', 'Email cannot be empty').not().isEmpty().trim(),
    body('email', 'Invalid email format').isEmail().trim(),
    body('password', 'Password cannot be empty').not().isEmpty().escape(),
];

export const registerValidator = [
    body('first_name', 'First name cannot be empty')
        .not()
        .isEmpty()
        .trim()
        .escape(),
    body('last_name', 'Last name cannot be empty')
        .not()
        .isEmpty()
        .trim()
        .escape(),
    body('email', 'Email cannot be empty').not().isEmpty().trim().escape(),
    body('email', 'Invalid email format').isEmail().normalizeEmail(),
    body('password', 'Password cannot be empty').not().isEmpty().escape(),
    body('password', 'Minimum password length is 6 characters').isLength({
        min: 6,
    }),
    body('role', 'Role cannot be empty').not().isEmpty().trim(),
    body('role', 'Invalid user role').custom(value =>
        userRoles.includes(Number(value))
    ),
];

// // import '@testing-library/jest-dom';
// // import { fireEvent, render, screen } from '../../utils/test-utils';
// // import Sessions, { getStringDate, initialWeek } from './Sessions';
// // import { dayjs } from '@tsl-frontend/tsl-utilities';
// // import { QueryClient, QueryClientProvider } from 'react-query';
// // const queryClient = new QueryClient();

// // const initialWeekLabel = `${getStringDate(
// //     initialWeek?.weekStart
// // )} - ${getStringDate(initialWeek?.weekEnd)}`;

// // const mockDate = dayjs('08/14/2023');

// // const nextWeekLabel = `${getStringDate(
// //     mockDate.startOf('week').add(1, 'day')
// // )} - ${getStringDate(mockDate.endOf('week').add(-1, 'day'))}`;

// // describe('Sessions component tests', () => {
// //     it('Render title and initial selected date range label tests', () => {
// //         render(
// //             <QueryClientProvider client={queryClient} contextSharing={true}>
// //                 <Sessions />
// //             </QueryClientProvider>
// //         );

// //         expect(screen.getByText('Sessions')).toBeInTheDocument();

// //         // initial header week range label
// //         expect(screen.getByText(initialWeekLabel)).toBeInTheDocument();
// //     });

// //     it.skip('Update selected date range label on changing the week tests', () => {
// //         render(
// //             <QueryClientProvider client={queryClient} contextSharing={true}>
// //                 <Sessions />
// //             </QueryClientProvider>
// //         );

// //         // open calander
// //         const weekpickerElement = screen.getByTestId('weekpicker');
// //         fireEvent.click(weekpickerElement);

// //         // click on a date
// //         fireEvent.click(screen.getByText(mockDate.date()));

// //         // cancel button
// //         const cancelButton = screen.getByRole('button', { name: 'Cancel' });
// //         expect(cancelButton).toBeDefined();
// //         fireEvent.click(cancelButton);

// //         // selected start and end date label should be matched to the initial week
// //         expect(screen.getByText(initialWeekLabel)).toBeInTheDocument();
// //         expect(screen.queryByText(nextWeekLabel)).not.toBeInTheDocument();

// //         // open weekpicker and select a date from the next week
// //         fireEvent.click(weekpickerElement);
// //         fireEvent.click(screen.getByText(mockDate.date()));

// //         // submit button
// //         const submitButton = screen.getByRole('button', { name: 'Submit' });
// //         expect(submitButton).toBeDefined();
// //         fireEvent.click(submitButton);

// //         // selected start and end date label should be updated to the next selected week
// //         expect(screen.queryByText(initialWeekLabel)).not.toBeInTheDocument();
// //         expect(screen.getByText(nextWeekLabel)).toBeInTheDocument();
// //     });
// // });

// import '@testing-library/jest-dom';
// import {
//     fireEvent,
//     render,
//     screen,
//     waitFor,
//     within,
// } from '../../utils/test-utils';
// import Sessions, { getStringDate, initialWeek } from './Sessions';
// import * as module from './Sessions';
// import { Dayjs, dayjs } from '@tsl-frontend/tsl-utilities';
// import { QueryClient, QueryClientProvider } from 'react-query';
// import i18n from '../../../i18n';
// import { I18nextProvider } from 'react-i18next';
// import { CalendarResult } from '../../shared/calendar-picker/CalendarPicker';
// import { ThemeProvider, TeacherTheme } from '@thirdspacelearning/library';

// import { setupServer } from 'msw/node';
// import { rest } from 'msw';

// const mockResponse = [
//     // {
//     //     swappedStudent: null,
//     //     sessionPlannedAt: '2023-10-16T09:00:00Z',
//     //     student: null,
//     //     cancelled: null,
//     //     id: 812432,
//     //     studentAbsent: false,
//     //     subjectTitle: null,
//     //     previousStudent: null,
//     // },
//     // {
//     //     swappedStudent: null,
//     //     sessionPlannedAt: '2023-10-16T09:00:00Z',
//     //     student: null,
//     //     cancelled: null,
//     //     id: 812444,
//     //     studentAbsent: false,
//     //     subjectTitle: null,
//     //     previousStudent: null,
//     // },
//     // {
//     //     swappedStudent: null,
//     //     sessionPlannedAt: '2023-10-16T09:00:00Z',
//     //     student: null,
//     //     cancelled: null,
//     //     id: 812444,
//     //     studentAbsent: false,
//     //     subjectTitle: null,
//     //     previousStudent: null,
//     // },

//     {
//         swappedStudent: {
//             id: 218072,
//             firstName: 'Maria Alejandra',
//             lastName: 'Parra',
//             yearId: 7,
//         },
//         sessionPlannedAt: '2023-10-18T14:00:00Z',
//         student: {
//             id: 218073,
//             firstName: 'David',
//             lastName: 'Smith',
//             yearId: 10,
//         },
//         cancelled: null,
//         id: 812473,
//         studentAbsent: false,
//         subjectTitle: null,
//         previousStudent: null,
//     },
//     // {
//     //     swappedStudent: null,
//     //     sessionPlannedAt: '2023-10-19T14:30:00Z',
//     //     student: [
//     //         {
//     //             id: 218072,
//     //             firstName: 'Maria Alejandra',
//     //             lastName: 'Parra',
//     //             yearId: 7,
//     //         },
//     //     ],
//     //     cancelled: true,
//     //     id: 812505,
//     //     studentAbsent: true,
//     //     subjectTitle: null,
//     //     previousStudent: {
//     //         id: 218040,
//     //         firstName: 'alice',
//     //         lastName: 'morrice',
//     //         yearId: 6,
//     //     },
//     // },
//     // {
//     //     swappedStudent: null,
//     //     sessionPlannedAt: '2023-10-20T14:30:00Z',
//     //     student: {
//     //         id: 218041,
//     //         firstName: 'gianni',
//     //         lastName: 'mazza',
//     //         yearId: 6,
//     //     },
//     //     cancelled: true,
//     //     id: 812506,
//     //     studentAbsent: false,
//     //     subjectTitle: null,
//     //     previousStudent: null,
//     // },

//     // {
//     //     swappedStudent: null,
//     //     sessionPlannedAt: '2023-10-20T14:30:00Z',
//     //     student: {
//     //         id: 218043,
//     //         firstName: 'Chamara',
//     //         lastName: 'C',
//     //         yearId: 6,
//     //     },
//     //     cancelled: true,
//     //     id: 812513,
//     //     studentAbsent: false,
//     //     subjectTitle: null,
//     //     previousStudent: {
//     //         id: 218043,
//     //         firstName: 'marco',
//     //         lastName: 'service',
//     //         yearId: 6,
//     //     },
//     // },
// ];

// const pastMockSessions = [
//     {
//         swappedStudent: null,
//         sessionPlannedAt: '2023-10-09T14:30:00Z',
//         student: [
//             {
//                 id: 218072,
//                 firstName: 'Maria Alejandra',
//                 lastName: 'Parra',
//                 yearId: 7,
//             },
//         ],
//         cancelled: true,
//         id: 812505,
//         studentAbsent: true,
//         subjectTitle: null,
//         previousStudent: {
//             id: 218040,
//             firstName: 'alice',
//             lastName: 'morrice',
//             yearId: 6,
//         },
//     },
//     {
//         swappedStudent: null,
//         sessionPlannedAt: '2023-10-11T14:30:00Z',
//         student: {
//             id: 218041,
//             firstName: 'gianni',
//             lastName: 'mazza',
//             yearId: 6,
//         },
//         cancelled: false,
//         id: 812506,
//         studentAbsent: false,
//         subjectTitle: null,
//         previousStudent: null,
//     },
// ];

// const markAbsentHander = [
//     rest.get('*/sessions', (req, res, ctx) => {
//         return res(ctx.json({ id: 1 }));
//     }),
// ];

// const emptySessionHandlers = [
//     rest.get('*/sessions', (req, res, ctx) => {
//         return res(ctx.json([]));
//     }),
// ];

// const errorSessionsHandlers = [
//     rest.get('*/sessions', (_req, res, ctx) =>
//         res(
//             ctx.status(400),
//             ctx.json({
//                 message: 'Oops! Something went terribly wrong.',
//             }),
//             ctx.delay(100)
//         )
//     ),
// ];

// const currentSessionsHandlers = [
//     rest.get('*/sessions', (req, res, ctx) => {
//         return res(ctx.json(mockResponse));
//     }),
// ];

// const pastSessionsHandlers = [
//     rest.get('*/sessions', (req, res, ctx) => {
//         return res(ctx.json(pastMockSessions));
//     }),
// ];

// const server = setupServer(...emptySessionHandlers);

// const getSelectedWeekMeta = (date: Dayjs) => ({
//     date: date,
//     weekStart: date.startOf('week').add(1, 'day'),
//     weekEnd: date.endOf('week').add(-1, 'day'),
// });

// const today = dayjs('10/16/2023');
// const pastDay = dayjs('10/09/2023');
// const futureDay = dayjs('10/23/2023');

// initialWeek.date = today;
// initialWeek.weekStart = today.startOf('week');
// initialWeek.weekEnd = today.endOf('week');

// jest.spyOn(module, 'getInitialWeek').mockImplementation(() => initialWeek);

// const queryClient = new QueryClient({
//     defaultOptions: {
//         queries: {
//             // ✅ turns retries off
//             retryDelay: 1,
//             retry: 0,
//         },
//     },
// });

// const getSelectedWeekLabel = (selectedWeek: CalendarResult) =>
//     `${getStringDate(selectedWeek?.weekStart)} - ${getStringDate(
//         selectedWeek?.weekEnd
//     )}`;

// const pastWeek = getSelectedWeekMeta(pastDay);
// const futureWeek = getSelectedWeekMeta(futureDay);

// const initialWeekLabel = getSelectedWeekLabel(initialWeek);
// const pastWeekLabel = getSelectedWeekLabel(pastWeek);
// const futureWeekLabel = getSelectedWeekLabel(futureWeek);

// // jest.mock('react-query', () => {
// //     const original: typeof ReactQuery = jest.requireActual('react-query');

// //     return {
// //         ...original,
// //         useQuery: () => ({ status: 'success', data: mockResponse }),
// //     };
// // });

// const rendrComponent = () =>
//     render(
//         <I18nextProvider i18n={i18n}>
//             <ThemeProvider theme={TeacherTheme}>
//                 <QueryClientProvider client={queryClient}>
//                     <Sessions />
//                 </QueryClientProvider>
//             </ThemeProvider>
//         </I18nextProvider>
//     );

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

// describe('Sessions component tests', () => {
//     jest.spyOn(console, 'error').mockImplementation(() => {});

//     it('Server error tests', async () => {
//         server.use(...errorSessionsHandlers);
//         rendrComponent();

//         await waitFor(
//             async () => {
//                 expect(
//                     screen.queryByText('Loading sessions...')
//                 ).not.toBeInTheDocument();
//             },
//             { timeout: 1000 }
//         );

//         expect(
//             screen.getByText('Something went wrong loading the page')
//         ).toBeInTheDocument();
//         expect(
//             screen.getByText('Please refresh and try again')
//         ).toBeInTheDocument();
//         expect(screen.getByText('Refresh page')).toBeInTheDocument();

//         //screen.debug(undefined, 100000);
//     });

//     it.skip('Render title, selected date range label, calander navigation and empty bookings message tests', async () => {
//         const { unmount } = rendrComponent();

//         expect(screen.getByText('Sessions')).toBeInTheDocument();

//         // initial header week range label
//         expect(screen.getByText(initialWeekLabel)).toBeInTheDocument();

//         // open calander
//         const weekpickerElement = screen.getByTestId('weekpicker');
//         fireEvent.click(weekpickerElement);

//         // click on a date
//         fireEvent.click(screen.getByText(futureWeek.date.date()));

//         // cancel button
//         const cancelButton = screen.getByRole('button', { name: 'Cancel' });
//         expect(cancelButton).toBeDefined();
//         fireEvent.click(cancelButton);

//         // selected start and end date label should be matched to the initial week
//         expect(screen.getByText(initialWeekLabel)).toBeInTheDocument();
//         expect(screen.queryByText(futureWeekLabel)).not.toBeInTheDocument();

//         // open weekpicker and select a date from the next week
//         fireEvent.click(weekpickerElement);
//         fireEvent.click(screen.getByText(futureWeek.date.date()));

//         // submit button
//         const submitButton = screen.getByRole('button', { name: 'Submit' });
//         expect(submitButton).toBeDefined();
//         fireEvent.click(submitButton);

//         // selected start and end date label should be updated to the next selected week
//         expect(screen.queryByText(initialWeekLabel)).not.toBeInTheDocument();
//         expect(screen.getByText(futureWeekLabel)).toBeInTheDocument();

//         // open weekpicker and select a date from the past week
//         fireEvent.click(weekpickerElement);
//         fireEvent.click(screen.getByText(pastWeek.date.date()));

//         // submit button
//         fireEvent.click(submitButton);

//         // selected start and end date label should be updated to the next selected week
//         expect(screen.queryByText(initialWeekLabel)).not.toBeInTheDocument();
//         expect(screen.getByText(pastWeekLabel)).toBeInTheDocument();

//         // No sessions booked message with Img
//         await waitFor(async () => {
//             expect(
//                 screen.queryByText('Loading sessions...')
//             ).not.toBeInTheDocument();
//         });

//         const noSessionsImg = screen.getByRole('img');
//         expect(noSessionsImg).toHaveAttribute('src', 'no-booked-sessions.svg');
//         expect(noSessionsImg).toHaveAttribute('alt', 'No sessions boocked');

//         unmount();
//     });

//     it.skip('Current week sessions tests', async () => {
//         server.use(...currentSessionsHandlers);
//         const { unmount } = rendrComponent();

//         expect(screen.getByText('Loading sessions...')).toBeInTheDocument();

//         await waitFor(async () => {
//             expect(
//                 screen.queryByText('Loading sessions...')
//             ).not.toBeInTheDocument();
//         });
//         screen.debug(undefined, 100000);
//         // empty session group
//         // const sessionGroup1 = screen.getByTestId('group-0');
//         // screen.debug(undefined, 100000);

//         // expect(
//         //     within(sessionGroup1).getByText('Monday, 16th October')
//         // ).toBeInTheDocument();
//         // expect(
//         //     within(sessionGroup1).getByText('0/3 spaces filled')
//         // ).toBeInTheDocument();
//         // expect(
//         //     within(sessionGroup1).getByText('Assign pupils')
//         // ).toBeInTheDocument();

//         // // filled session group
//         // const sessionGroup2 = screen.getByTestId('group-1');
//         // screen.debug(undefined, 100000);

//         // expect(
//         //     within(sessionGroup2).getByText('Wednesday, 18th October')
//         // ).toBeInTheDocument();
//         // expect(
//         //     within(sessionGroup2).getByText('1/1 spaces filled')
//         // ).toBeInTheDocument();
//         // expect(
//         //     within(sessionGroup2).getByText('Cancel group')
//         // ).toBeInTheDocument();
//         // expect(
//         //     within(sessionGroup2).getByText('David Smith')
//         // ).toBeInTheDocument();
//         // expect(
//         //     within(sessionGroup2).getByText('See all objectives')
//         // ).toBeInTheDocument();
//         // expect(
//         //     within(sessionGroup2).getByText('Swapped in')
//         // ).toBeInTheDocument();
//         // expect(
//         //     within(sessionGroup2).getByText('Swap pupil')
//         // ).toBeInTheDocument();
//         // expect(within(sessionGroup2).getByText('Absent')).toBeInTheDocument();

//         // Absent button
//         const absentButton = screen.getByRole('button', { name: 'Absent' });
//         expect(absentButton).toBeDefined();
//         fireEvent.click(absentButton);

//         expect(screen.getByText('Mark pupil as absent?')).toBeInTheDocument();
//         expect(
//             screen.getByText(`This pupil's session will be cancelled`)
//         ).toBeInTheDocument();

//         // cancel button
//         const cancelButton = screen.getByRole('button', { name: 'Close' });
//         expect(cancelButton).toBeDefined();
//         fireEvent.click(cancelButton);

//         expect(
//             screen.queryByText('Mark pupil as absent?')
//         ).not.toBeInTheDocument();

//         // cancelled session group
//         // const sessionGroup3 = screen.getByTestId('group-2');
//         // screen.debug(undefined, 100000);

//         // expect(
//         //     within(sessionGroup3).getByText('Thursday, 19th October')
//         // ).toBeInTheDocument();
//         // expect(
//         //     within(sessionGroup3).getByText('1/1 spaces filled')
//         // ).toBeInTheDocument();
//         // expect(
//         //     within(sessionGroup3).getByText('Group cancelled')
//         // ).toBeInTheDocument();
//         // expect(
//         //     within(sessionGroup3).getByText('alice morrice')
//         // ).toBeInTheDocument();
//         // expect(
//         //     within(sessionGroup3).getByText('Cancelled')
//         // ).toBeInTheDocument();

//         unmount();
//     });

//     it.skip('Mark student absent tests', async () => {
//         server.use(...currentSessionsHandlers, ...markAbsentHander);
//         const { unmount } = rendrComponent();

//         expect(screen.getByText('Loading sessions...')).toBeInTheDocument();

//         await waitFor(async () => {
//             expect(
//                 screen.queryByText('Loading sessions...')
//             ).not.toBeInTheDocument();
//         });

//         // Absent button
//         const absentButton = screen.getByRole('button', { name: 'Absent' });
//         expect(absentButton).toBeDefined();
//         fireEvent.click(absentButton);

//         expect(screen.getByText('Mark pupil as absenst?')).toBeInTheDocument();
//         expect(
//             screen.getByText(`This pupil's sessions will be cancelled`)
//         ).toBeInTheDocument();
//         screen.debug(undefined, 100000);

//         // cancel button
//         const cancelButton = screen.getByRole('button', { name: 'Closes' });
//         expect(cancelButton).toBeDefined();
//         fireEvent.click(cancelButton);

//         expect(
//             screen.queryByText('Mark pupil as absent?')
//         ).not.toBeInTheDocument();

//         // mark absent button
//         fireEvent.click(absentButton);
//         const markAbsentButton = screen.getByRole('button', {
//             name: 'Confirm absent',
//         });
//         expect(markAbsentButton).toBeDefined();
//         fireEvent.click(markAbsentButton);

//         expect(screen.getByText('Absent')).toBeInTheDocument();

//         unmount();
//     });

//     it.skip('Past sessions tests', async () => {
//         server.use(...pastSessionsHandlers);
//         const { unmount } = rendrComponent();

//         // open calander
//         const weekpickerElement = screen.getByTestId('weekpicker');
//         fireEvent.click(weekpickerElement);

//         // click on a date
//         fireEvent.click(screen.getByText(pastWeek.date.date()));

//         // submit button
//         const submitButton = screen.getByRole('button', { name: 'Submit' });
//         expect(submitButton).toBeDefined();
//         fireEvent.click(submitButton);

//         // selected start and end date label should be updated to the next selected week
//         expect(screen.queryByText(initialWeekLabel)).not.toBeInTheDocument();
//         expect(screen.getByText(pastWeekLabel)).toBeInTheDocument();

//         expect(screen.getByText('Loading sessions...')).toBeInTheDocument();

//         await waitFor(async () => {
//             expect(
//                 screen.queryByText('Loading sessions...')
//             ).not.toBeInTheDocument();
//         });

//         // cancelled group
//         const sessionGroup1 = screen.getByTestId('group-0');

//         expect(
//             within(sessionGroup1).getByText('Monday, 9th October')
//         ).toBeInTheDocument();
//         expect(
//             within(sessionGroup1).getByText('Group cancelled')
//         ).toBeInTheDocument();

//         // check if view reports button and filled count label are hidden for cancelled past groups
//         expect(
//             within(sessionGroup1).queryByText('View reports')
//         ).not.toBeInTheDocument();
//         expect(
//             within(sessionGroup1).queryByText('1/1 spaces filled')
//         ).not.toBeInTheDocument();

//         //Completed group
//         const sessionGroup2 = screen.getByTestId('group-1');

//         expect(
//             within(sessionGroup2).getByText('Wednesday, 11th October')
//         ).toBeInTheDocument();
//         expect(
//             within(sessionGroup2).getByText('View reports')
//         ).toBeInTheDocument();
//         expect(
//             within(sessionGroup2).getByText('1/1 spaces filled')
//         ).toBeInTheDocument();

//         // View reports button
//         const viewReportsButton = screen.getByRole('button', {
//             name: 'View reports',
//         });
//         expect(viewReportsButton).toBeDefined();
//         fireEvent.click(viewReportsButton);

//         // Report page under construction dialog - TODO- remove this ocne report page is linked to the button
//         expect(
//             screen.getByText('We are currently working on a new reports page')
//         ).toBeInTheDocument();

//         unmount();
//     });
// });
