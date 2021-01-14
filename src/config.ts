import path from 'path'

export const headers = 'node1 , node2, weight'

export const dateFormatRegex = /\d{1,2}\/\d{2}\/\d{4}/

export const readLocation = path.join(__dirname, '..', 'volunteer_attendance_data.csv')

export const writeLocation = 'output.csv'
