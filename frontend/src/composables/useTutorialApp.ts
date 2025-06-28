import {driver} from 'driver.js'
import 'driver.js/dist/driver.css'

export function useTutorial() {
    const driverObj = driver({
        showProgress: true,
        nextBtnText: 'Next →',
        prevBtnText: '← Previous',
        doneBtnText: 'Finish tutorial',
        showButtons: ['next', 'previous', 'close'],

        animate: true,
        overlayColor: 'rgba(0, 0, 0, 0.88)',
        popoverClass: 'tutorial-dark-theme',

        steps: [
            { 
                element: '#connect-button',
                popover: {
                    title: 'Connect to device',
                    description: 'First plug in your deivce, then click on this button to establish the connection.',
                    side: 'bottom',
                    align: 'end'
                }
            },
            { 
                element: '#key-1',
                popover: {
                    title: 'Bind keys',
                    description: 'Left klick to the button to start binding keypresses.',
                    side: 'left',
                    align: 'start'
                }
            },
            { 
                element: '#key-2',
                popover: {
                    title: 'Multi-key',
                    description: 'RIGHT CLICK the button to open multi-key binding dialog and bind custom acitons.',
                    side: 'right',
                    align: 'start'
                }
            },
            { 
                element: '.page-button[data-page="2"]',
                popover: {
                    title: 'Change pages',
                    description: 'Click on the buttons to switch binding pages, or press TAB.',
                    side: 'right',
                    align: 'start'
                }
            },
            { 
                element: '.knob-page-btn',
                popover: {
                    title: 'Bind knob',
                    description: 'Click on this button to start binding knob acitons.',
                    side: 'top',
                    align: 'start'
                }
            },
            { 
                element: '#submit-button',
                popover: {
                    title: 'Send binding to device',
                    description: 'When the device is connected, click this button to send the current binding to the device and override the current saved data.',
                    side: 'top',
                    align: 'start'
                }
            },
            { 
                element: '.info-button',
                popover: {
                    title: 'Start tutorial',
                    description: 'Click this button to start the tutorial again.',
                    side: 'left',
                    align: 'start'
                }
            },
        ]
    })

    const startTutorial = () => {
        driverObj.drive()
    }

    return {
        startTutorial
    }
}