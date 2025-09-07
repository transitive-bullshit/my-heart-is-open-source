const daysRaw: any = [
  {
    level: 1,
    numContributions: 8,
    date: 'September 1st',
    month: 8,
    day: 1,
    index: 0
  },
  {
    level: 1,
    numContributions: 10,
    date: 'September 8th',
    month: 8,
    day: 8,
    index: 1
  },
  {
    level: 1,
    numContributions: 7,
    date: 'September 15th',
    month: 8,
    day: 15,
    index: 2
  },
  {
    level: 0,
    numContributions: 0,
    date: 'September 22nd',
    month: 8,
    day: 22,
    index: 3
  },
  {
    level: 1,
    numContributions: 16,
    date: 'September 29th',
    month: 8,
    day: 29,
    index: 4
  },
  {
    level: 4,
    numContributions: 56,
    date: 'October 6th',
    month: 9,
    day: 6,
    index: 5
  },
  {
    level: 1,
    numContributions: 4,
    date: 'October 13th',
    month: 9,
    day: 13,
    index: 6
  },
  {
    level: 1,
    numContributions: 5,
    date: 'October 20th',
    month: 9,
    day: 20,
    index: 7
  },
  {
    level: 1,
    numContributions: 10,
    date: 'October 27th',
    month: 9,
    day: 27,
    index: 8
  },
  {
    level: 1,
    numContributions: 13,
    date: 'November 3rd',
    month: 10,
    day: 3,
    index: 9
  },
  {
    level: 1,
    numContributions: 9,
    date: 'November 10th',
    month: 10,
    day: 10,
    index: 10
  },
  {
    level: 1,
    numContributions: 11,
    date: 'November 17th',
    month: 10,
    day: 17,
    index: 11
  },
  {
    level: 2,
    numContributions: 26,
    date: 'November 24th',
    month: 10,
    day: 24,
    index: 12
  },
  {
    level: 2,
    numContributions: 29,
    date: 'December 1st',
    month: 11,
    day: 1,
    index: 13
  },
  {
    level: 1,
    numContributions: 13,
    date: 'December 8th',
    month: 11,
    day: 8,
    index: 14
  },
  {
    level: 1,
    numContributions: 5,
    date: 'December 15th',
    month: 11,
    day: 15,
    index: 15
  },
  {
    level: 1,
    numContributions: 8,
    date: 'December 22nd',
    month: 11,
    day: 22,
    index: 16
  },
  {
    level: 2,
    numContributions: 29,
    date: 'December 29th',
    month: 11,
    day: 29,
    index: 17
  },
  {
    level: 1,
    numContributions: 2,
    date: 'January 5th',
    month: 0,
    day: 5,
    index: 18
  },
  {
    level: 2,
    numContributions: 20,
    date: 'January 12th',
    month: 0,
    day: 12,
    index: 19
  },
  {
    level: 1,
    numContributions: 16,
    date: 'January 19th',
    month: 0,
    day: 19,
    index: 20
  },
  {
    level: 1,
    numContributions: 3,
    date: 'January 26th',
    month: 0,
    day: 26,
    index: 21
  },
  {
    level: 1,
    numContributions: 11,
    date: 'February 2nd',
    month: 1,
    day: 2,
    index: 22
  },
  {
    level: 1,
    numContributions: 15,
    date: 'February 9th',
    month: 1,
    day: 9,
    index: 23
  },
  {
    level: 1,
    numContributions: 6,
    date: 'February 16th',
    month: 1,
    day: 16,
    index: 24
  },
  {
    level: 1,
    numContributions: 16,
    date: 'February 23rd',
    month: 1,
    day: 23,
    index: 25
  },
  {
    level: 1,
    numContributions: 6,
    date: 'March 2nd',
    month: 2,
    day: 2,
    index: 26
  },
  {
    level: 0,
    numContributions: 0,
    date: 'March 9th',
    month: 2,
    day: 9,
    index: 27
  },
  {
    level: 3,
    numContributions: 36,
    date: 'March 16th',
    month: 2,
    day: 16,
    index: 28
  },
  {
    level: 3,
    numContributions: 37,
    date: 'March 23rd',
    month: 2,
    day: 23,
    index: 29
  },
  {
    level: 0,
    numContributions: 0,
    date: 'March 30th',
    month: 2,
    day: 30,
    index: 30
  },
  {
    level: 1,
    numContributions: 3,
    date: 'April 6th',
    month: 3,
    day: 6,
    index: 31
  },
  {
    level: 1,
    numContributions: 4,
    date: 'April 13th',
    month: 3,
    day: 13,
    index: 32
  },
  {
    level: 0,
    numContributions: 0,
    date: 'April 20th',
    month: 3,
    day: 20,
    index: 33
  },
  {
    level: 1,
    numContributions: 7,
    date: 'April 27th',
    month: 3,
    day: 27,
    index: 34
  },
  {
    level: 1,
    numContributions: 3,
    date: 'May 4th',
    month: 4,
    day: 4,
    index: 35
  },
  {
    level: 0,
    numContributions: 0,
    date: 'May 11th',
    month: 4,
    day: 11,
    index: 36
  },
  {
    level: 2,
    numContributions: 20,
    date: 'May 18th',
    month: 4,
    day: 18,
    index: 37
  },
  {
    level: 3,
    numContributions: 42,
    date: 'May 25th',
    month: 4,
    day: 25,
    index: 38
  },
  {
    level: 2,
    numContributions: 28,
    date: 'June 1st',
    month: 5,
    day: 1,
    index: 39
  },
  {
    level: 1,
    numContributions: 9,
    date: 'June 8th',
    month: 5,
    day: 8,
    index: 40
  },
  {
    level: 1,
    numContributions: 5,
    date: 'June 15th',
    month: 5,
    day: 15,
    index: 41
  },
  {
    level: 0,
    numContributions: 0,
    date: 'June 22nd',
    month: 5,
    day: 22,
    index: 42
  },
  {
    level: 4,
    numContributions: 49,
    date: 'June 29th',
    month: 5,
    day: 29,
    index: 43
  },
  {
    level: 0,
    numContributions: 0,
    date: 'July 6th',
    month: 6,
    day: 6,
    index: 44
  },
  {
    level: 1,
    numContributions: 16,
    date: 'July 13th',
    month: 6,
    day: 13,
    index: 45
  },
  {
    level: 0,
    numContributions: 0,
    date: 'July 20th',
    month: 6,
    day: 20,
    index: 46
  },
  {
    level: 1,
    numContributions: 10,
    date: 'July 27th',
    month: 6,
    day: 27,
    index: 47
  },
  {
    level: 1,
    numContributions: 14,
    date: 'August 3rd',
    month: 7,
    day: 3,
    index: 48
  },
  {
    level: 1,
    numContributions: 13,
    date: 'August 10th',
    month: 7,
    day: 10,
    index: 49
  },
  {
    level: 1,
    numContributions: 15,
    date: 'August 17th',
    month: 7,
    day: 17,
    index: 50
  },
  {
    level: 1,
    numContributions: 1,
    date: 'August 24th',
    month: 7,
    day: 24,
    index: 51
  },
  {
    level: 0,
    numContributions: 0,
    date: 'August 31st',
    month: 7,
    day: 31,
    index: 52
  },
  {
    level: 2,
    numContributions: 28,
    date: 'September 2nd',
    month: 8,
    day: 2,
    index: 53
  },
  {
    level: 1,
    numContributions: 4,
    date: 'September 9th',
    month: 8,
    day: 9,
    index: 54
  },
  {
    level: 1,
    numContributions: 7,
    date: 'September 16th',
    month: 8,
    day: 16,
    index: 55
  },
  {
    level: 0,
    numContributions: 0,
    date: 'September 23rd',
    month: 8,
    day: 23,
    index: 56
  },
  {
    level: 1,
    numContributions: 13,
    date: 'September 30th',
    month: 8,
    day: 30,
    index: 57
  },
  {
    level: 2,
    numContributions: 29,
    date: 'October 7th',
    month: 9,
    day: 7,
    index: 58
  },
  {
    level: 1,
    numContributions: 3,
    date: 'October 14th',
    month: 9,
    day: 14,
    index: 59
  },
  {
    level: 2,
    numContributions: 27,
    date: 'October 21st',
    month: 9,
    day: 21,
    index: 60
  },
  {
    level: 1,
    numContributions: 10,
    date: 'October 28th',
    month: 9,
    day: 28,
    index: 61
  },
  {
    level: 1,
    numContributions: 13,
    date: 'November 4th',
    month: 10,
    day: 4,
    index: 62
  },
  {
    level: 2,
    numContributions: 19,
    date: 'November 11th',
    month: 10,
    day: 11,
    index: 63
  },
  {
    level: 1,
    numContributions: 15,
    date: 'November 18th',
    month: 10,
    day: 18,
    index: 64
  },
  {
    level: 2,
    numContributions: 17,
    date: 'November 25th',
    month: 10,
    day: 25,
    index: 65
  },
  {
    level: 2,
    numContributions: 17,
    date: 'December 2nd',
    month: 11,
    day: 2,
    index: 66
  },
  {
    level: 1,
    numContributions: 14,
    date: 'December 9th',
    month: 11,
    day: 9,
    index: 67
  },
  {
    level: 1,
    numContributions: 13,
    date: 'December 16th',
    month: 11,
    day: 16,
    index: 68
  },
  {
    level: 1,
    numContributions: 6,
    date: 'December 23rd',
    month: 11,
    day: 23,
    index: 69
  },
  {
    level: 2,
    numContributions: 29,
    date: 'December 30th',
    month: 11,
    day: 30,
    index: 70
  },
  {
    level: 1,
    numContributions: 5,
    date: 'January 6th',
    month: 0,
    day: 6,
    index: 71
  },
  {
    level: 1,
    numContributions: 10,
    date: 'January 13th',
    month: 0,
    day: 13,
    index: 72
  },
  {
    level: 1,
    numContributions: 13,
    date: 'January 20th',
    month: 0,
    day: 20,
    index: 73
  },
  {
    level: 1,
    numContributions: 9,
    date: 'January 27th',
    month: 0,
    day: 27,
    index: 74
  },
  {
    level: 1,
    numContributions: 5,
    date: 'February 3rd',
    month: 1,
    day: 3,
    index: 75
  },
  {
    level: 2,
    numContributions: 20,
    date: 'February 10th',
    month: 1,
    day: 10,
    index: 76
  },
  {
    level: 1,
    numContributions: 8,
    date: 'February 17th',
    month: 1,
    day: 17,
    index: 77
  },
  {
    level: 2,
    numContributions: 28,
    date: 'February 24th',
    month: 1,
    day: 24,
    index: 78
  },
  {
    level: 1,
    numContributions: 11,
    date: 'March 3rd',
    month: 2,
    day: 3,
    index: 79
  },
  {
    level: 1,
    numContributions: 1,
    date: 'March 10th',
    month: 2,
    day: 10,
    index: 80
  },
  {
    level: 1,
    numContributions: 5,
    date: 'March 17th',
    month: 2,
    day: 17,
    index: 81
  },
  {
    level: 4,
    numContributions: 62,
    date: 'March 24th',
    month: 2,
    day: 24,
    index: 82
  },
  {
    level: 1,
    numContributions: 12,
    date: 'March 31st',
    month: 2,
    day: 31,
    index: 83
  },
  {
    level: 1,
    numContributions: 4,
    date: 'April 7th',
    month: 3,
    day: 7,
    index: 84
  },
  {
    level: 1,
    numContributions: 5,
    date: 'April 14th',
    month: 3,
    day: 14,
    index: 85
  },
  {
    level: 1,
    numContributions: 4,
    date: 'April 21st',
    month: 3,
    day: 21,
    index: 86
  },
  {
    level: 1,
    numContributions: 4,
    date: 'April 28th',
    month: 3,
    day: 28,
    index: 87
  },
  {
    level: 1,
    numContributions: 2,
    date: 'May 5th',
    month: 4,
    day: 5,
    index: 88
  },
  {
    level: 0,
    numContributions: 0,
    date: 'May 12th',
    month: 4,
    day: 12,
    index: 89
  },
  {
    level: 2,
    numContributions: 17,
    date: 'May 19th',
    month: 4,
    day: 19,
    index: 90
  },
  {
    level: 2,
    numContributions: 28,
    date: 'May 26th',
    month: 4,
    day: 26,
    index: 91
  },
  {
    level: 1,
    numContributions: 10,
    date: 'June 2nd',
    month: 5,
    day: 2,
    index: 92
  },
  {
    level: 1,
    numContributions: 10,
    date: 'June 9th',
    month: 5,
    day: 9,
    index: 93
  },
  {
    level: 2,
    numContributions: 20,
    date: 'June 16th',
    month: 5,
    day: 16,
    index: 94
  },
  {
    level: 1,
    numContributions: 2,
    date: 'June 23rd',
    month: 5,
    day: 23,
    index: 95
  },
  {
    level: 3,
    numContributions: 36,
    date: 'June 30th',
    month: 5,
    day: 30,
    index: 96
  },
  {
    level: 1,
    numContributions: 9,
    date: 'July 7th',
    month: 6,
    day: 7,
    index: 97
  },
  {
    level: 2,
    numContributions: 21,
    date: 'July 14th',
    month: 6,
    day: 14,
    index: 98
  },
  {
    level: 1,
    numContributions: 13,
    date: 'July 21st',
    month: 6,
    day: 21,
    index: 99
  },
  {
    level: 1,
    numContributions: 8,
    date: 'July 28th',
    month: 6,
    day: 28,
    index: 100
  },
  {
    level: 1,
    numContributions: 2,
    date: 'August 4th',
    month: 7,
    day: 4,
    index: 101
  },
  {
    level: 1,
    numContributions: 9,
    date: 'August 11th',
    month: 7,
    day: 11,
    index: 102
  },
  {
    level: 1,
    numContributions: 11,
    date: 'August 18th',
    month: 7,
    day: 18,
    index: 103
  },
  {
    level: 1,
    numContributions: 1,
    date: 'August 25th',
    month: 7,
    day: 25,
    index: 104
  },
  {
    level: 1,
    numContributions: 9,
    date: 'September 3rd',
    month: 8,
    day: 3,
    index: 106
  },
  {
    level: 1,
    numContributions: 4,
    date: 'September 10th',
    month: 8,
    day: 10,
    index: 107
  },
  {
    level: 1,
    numContributions: 7,
    date: 'September 17th',
    month: 8,
    day: 17,
    index: 108
  },
  {
    level: 1,
    numContributions: 6,
    date: 'September 24th',
    month: 8,
    day: 24,
    index: 109
  },
  {
    level: 1,
    numContributions: 12,
    date: 'October 1st',
    month: 9,
    day: 1,
    index: 110
  },
  {
    level: 3,
    numContributions: 39,
    date: 'October 8th',
    month: 9,
    day: 8,
    index: 111
  },
  {
    level: 1,
    numContributions: 12,
    date: 'October 15th',
    month: 9,
    day: 15,
    index: 112
  },
  {
    level: 1,
    numContributions: 12,
    date: 'October 22nd',
    month: 9,
    day: 22,
    index: 113
  },
  {
    level: 1,
    numContributions: 11,
    date: 'October 29th',
    month: 9,
    day: 29,
    index: 114
  },
  {
    level: 3,
    numContributions: 38,
    date: 'November 5th',
    month: 10,
    day: 5,
    index: 115
  },
  {
    level: 1,
    numContributions: 5,
    date: 'November 12th',
    month: 10,
    day: 12,
    index: 116
  },
  {
    level: 1,
    numContributions: 11,
    date: 'November 19th',
    month: 10,
    day: 19,
    index: 117
  },
  {
    level: 2,
    numContributions: 24,
    date: 'November 26th',
    month: 10,
    day: 26,
    index: 118
  },
  {
    level: 1,
    numContributions: 16,
    date: 'December 3rd',
    month: 11,
    day: 3,
    index: 119
  },
  {
    level: 2,
    numContributions: 27,
    date: 'December 10th',
    month: 11,
    day: 10,
    index: 120
  },
  {
    level: 1,
    numContributions: 15,
    date: 'December 17th',
    month: 11,
    day: 17,
    index: 121
  },
  {
    level: 1,
    numContributions: 15,
    date: 'December 24th',
    month: 11,
    day: 24,
    index: 122
  },
  {
    level: 2,
    numContributions: 18,
    date: 'December 31st',
    month: 11,
    day: 31,
    index: 123
  },
  {
    level: 1,
    numContributions: 9,
    date: 'January 7th',
    month: 0,
    day: 7,
    index: 124
  },
  {
    level: 1,
    numContributions: 16,
    date: 'January 14th',
    month: 0,
    day: 14,
    index: 125
  },
  {
    level: 1,
    numContributions: 3,
    date: 'January 21st',
    month: 0,
    day: 21,
    index: 126
  },
  {
    level: 1,
    numContributions: 16,
    date: 'January 28th',
    month: 0,
    day: 28,
    index: 127
  },
  {
    level: 1,
    numContributions: 4,
    date: 'February 4th',
    month: 1,
    day: 4,
    index: 128
  },
  {
    level: 2,
    numContributions: 24,
    date: 'February 11th',
    month: 1,
    day: 11,
    index: 129
  },
  {
    level: 1,
    numContributions: 5,
    date: 'February 18th',
    month: 1,
    day: 18,
    index: 130
  },
  {
    level: 3,
    numContributions: 39,
    date: 'February 25th',
    month: 1,
    day: 25,
    index: 131
  },
  {
    level: 1,
    numContributions: 9,
    date: 'March 4th',
    month: 2,
    day: 4,
    index: 132
  },
  {
    level: 1,
    numContributions: 1,
    date: 'March 11th',
    month: 2,
    day: 11,
    index: 133
  },
  {
    level: 4,
    numContributions: 92,
    date: 'March 18th',
    month: 2,
    day: 18,
    index: 134
  },
  {
    level: 4,
    numContributions: 125,
    date: 'March 25th',
    month: 2,
    day: 25,
    index: 135
  },
  {
    level: 1,
    numContributions: 7,
    date: 'April 1st',
    month: 3,
    day: 1,
    index: 136
  },
  {
    level: 0,
    numContributions: 0,
    date: 'April 8th',
    month: 3,
    day: 8,
    index: 137
  },
  {
    level: 0,
    numContributions: 0,
    date: 'April 15th',
    month: 3,
    day: 15,
    index: 138
  },
  {
    level: 1,
    numContributions: 8,
    date: 'April 22nd',
    month: 3,
    day: 22,
    index: 139
  },
  {
    level: 1,
    numContributions: 6,
    date: 'April 29th',
    month: 3,
    day: 29,
    index: 140
  },
  {
    level: 0,
    numContributions: 0,
    date: 'May 6th',
    month: 4,
    day: 6,
    index: 141
  },
  {
    level: 0,
    numContributions: 0,
    date: 'May 13th',
    month: 4,
    day: 13,
    index: 142
  },
  {
    level: 2,
    numContributions: 27,
    date: 'May 20th',
    month: 4,
    day: 20,
    index: 143
  },
  {
    level: 2,
    numContributions: 23,
    date: 'May 27th',
    month: 4,
    day: 27,
    index: 144
  },
  {
    level: 2,
    numContributions: 20,
    date: 'June 3rd',
    month: 5,
    day: 3,
    index: 145
  },
  {
    level: 2,
    numContributions: 26,
    date: 'June 10th',
    month: 5,
    day: 10,
    index: 146
  },
  {
    level: 3,
    numContributions: 43,
    date: 'June 17th',
    month: 5,
    day: 17,
    index: 147
  },
  {
    level: 4,
    numContributions: 64,
    date: 'June 24th',
    month: 5,
    day: 24,
    index: 148
  },
  {
    level: 3,
    numContributions: 46,
    date: 'July 1st',
    month: 6,
    day: 1,
    index: 149
  },
  {
    level: 1,
    numContributions: 10,
    date: 'July 8th',
    month: 6,
    day: 8,
    index: 150
  },
  {
    level: 1,
    numContributions: 13,
    date: 'July 15th',
    month: 6,
    day: 15,
    index: 151
  },
  {
    level: 1,
    numContributions: 12,
    date: 'July 22nd',
    month: 6,
    day: 22,
    index: 152
  },
  {
    level: 1,
    numContributions: 11,
    date: 'July 29th',
    month: 6,
    day: 29,
    index: 153
  },
  {
    level: 1,
    numContributions: 11,
    date: 'August 5th',
    month: 7,
    day: 5,
    index: 154
  },
  {
    level: 1,
    numContributions: 2,
    date: 'August 12th',
    month: 7,
    day: 12,
    index: 155
  },
  {
    level: 2,
    numContributions: 18,
    date: 'August 19th',
    month: 7,
    day: 19,
    index: 156
  },
  {
    level: 1,
    numContributions: 3,
    date: 'August 26th',
    month: 7,
    day: 26,
    index: 157
  },
  {
    level: 1,
    numContributions: 13,
    date: 'September 4th',
    month: 8,
    day: 4,
    index: 159
  },
  {
    level: 1,
    numContributions: 7,
    date: 'September 11th',
    month: 8,
    day: 11,
    index: 160
  },
  {
    level: 1,
    numContributions: 8,
    date: 'September 18th',
    month: 8,
    day: 18,
    index: 161
  },
  {
    level: 1,
    numContributions: 4,
    date: 'September 25th',
    month: 8,
    day: 25,
    index: 162
  },
  {
    level: 1,
    numContributions: 10,
    date: 'October 2nd',
    month: 9,
    day: 2,
    index: 163
  },
  {
    level: 1,
    numContributions: 4,
    date: 'October 9th',
    month: 9,
    day: 9,
    index: 164
  },
  {
    level: 4,
    numContributions: 51,
    date: 'October 16th',
    month: 9,
    day: 16,
    index: 165
  },
  {
    level: 1,
    numContributions: 10,
    date: 'October 23rd',
    month: 9,
    day: 23,
    index: 166
  },
  {
    level: 2,
    numContributions: 18,
    date: 'October 30th',
    month: 9,
    day: 30,
    index: 167
  },
  {
    level: 2,
    numContributions: 25,
    date: 'November 6th',
    month: 10,
    day: 6,
    index: 168
  },
  {
    level: 1,
    numContributions: 14,
    date: 'November 13th',
    month: 10,
    day: 13,
    index: 169
  },
  {
    level: 1,
    numContributions: 14,
    date: 'November 20th',
    month: 10,
    day: 20,
    index: 170
  },
  {
    level: 3,
    numContributions: 37,
    date: 'November 27th',
    month: 10,
    day: 27,
    index: 171
  },
  {
    level: 1,
    numContributions: 8,
    date: 'December 4th',
    month: 11,
    day: 4,
    index: 172
  },
  {
    level: 1,
    numContributions: 13,
    date: 'December 11th',
    month: 11,
    day: 11,
    index: 173
  },
  {
    level: 1,
    numContributions: 7,
    date: 'December 18th',
    month: 11,
    day: 18,
    index: 174
  },
  {
    level: 1,
    numContributions: 12,
    date: 'December 25th',
    month: 11,
    day: 25,
    index: 175
  },
  {
    level: 3,
    numContributions: 33,
    date: 'January 1st',
    month: 0,
    day: 1,
    index: 176
  },
  {
    level: 1,
    numContributions: 10,
    date: 'January 8th',
    month: 0,
    day: 8,
    index: 177
  },
  {
    level: 2,
    numContributions: 17,
    date: 'January 15th',
    month: 0,
    day: 15,
    index: 178
  },
  {
    level: 1,
    numContributions: 2,
    date: 'January 22nd',
    month: 0,
    day: 22,
    index: 179
  },
  {
    level: 0,
    numContributions: 0,
    date: 'January 29th',
    month: 0,
    day: 29,
    index: 180
  },
  {
    level: 1,
    numContributions: 16,
    date: 'February 5th',
    month: 1,
    day: 5,
    index: 181
  },
  {
    level: 2,
    numContributions: 31,
    date: 'February 12th',
    month: 1,
    day: 12,
    index: 182
  },
  {
    level: 3,
    numContributions: 37,
    date: 'February 19th',
    month: 1,
    day: 19,
    index: 183
  },
  {
    level: 1,
    numContributions: 8,
    date: 'February 26th',
    month: 1,
    day: 26,
    index: 184
  },
  {
    level: 2,
    numContributions: 28,
    date: 'March 5th',
    month: 2,
    day: 5,
    index: 185
  },
  {
    level: 1,
    numContributions: 8,
    date: 'March 12th',
    month: 2,
    day: 12,
    index: 186
  },
  {
    level: 1,
    numContributions: 13,
    date: 'March 19th',
    month: 2,
    day: 19,
    index: 187
  },
  {
    level: 1,
    numContributions: 3,
    date: 'March 26th',
    month: 2,
    day: 26,
    index: 188
  },
  {
    level: 1,
    numContributions: 1,
    date: 'April 2nd',
    month: 3,
    day: 2,
    index: 189
  },
  {
    level: 2,
    numContributions: 21,
    date: 'April 9th',
    month: 3,
    day: 9,
    index: 190
  },
  {
    level: 1,
    numContributions: 3,
    date: 'April 16th',
    month: 3,
    day: 16,
    index: 191
  },
  {
    level: 1,
    numContributions: 10,
    date: 'April 23rd',
    month: 3,
    day: 23,
    index: 192
  },
  {
    level: 1,
    numContributions: 8,
    date: 'April 30th',
    month: 3,
    day: 30,
    index: 193
  },
  {
    level: 0,
    numContributions: 0,
    date: 'May 7th',
    month: 4,
    day: 7,
    index: 194
  },
  {
    level: 1,
    numContributions: 14,
    date: 'May 14th',
    month: 4,
    day: 14,
    index: 195
  },
  {
    level: 1,
    numContributions: 14,
    date: 'May 21st',
    month: 4,
    day: 21,
    index: 196
  },
  {
    level: 0,
    numContributions: 0,
    date: 'May 28th',
    month: 4,
    day: 28,
    index: 197
  },
  {
    level: 1,
    numContributions: 15,
    date: 'June 4th',
    month: 5,
    day: 4,
    index: 198
  },
  {
    level: 3,
    numContributions: 33,
    date: 'June 11th',
    month: 5,
    day: 11,
    index: 199
  },
  {
    level: 2,
    numContributions: 30,
    date: 'June 18th',
    month: 5,
    day: 18,
    index: 200
  },
  {
    level: 3,
    numContributions: 46,
    date: 'June 25th',
    month: 5,
    day: 25,
    index: 201
  },
  {
    level: 3,
    numContributions: 35,
    date: 'July 2nd',
    month: 6,
    day: 2,
    index: 202
  },
  {
    level: 1,
    numContributions: 2,
    date: 'July 9th',
    month: 6,
    day: 9,
    index: 203
  },
  {
    level: 1,
    numContributions: 16,
    date: 'July 16th',
    month: 6,
    day: 16,
    index: 204
  },
  {
    level: 1,
    numContributions: 4,
    date: 'July 23rd',
    month: 6,
    day: 23,
    index: 205
  },
  {
    level: 2,
    numContributions: 17,
    date: 'July 30th',
    month: 6,
    day: 30,
    index: 206
  },
  {
    level: 1,
    numContributions: 3,
    date: 'August 6th',
    month: 7,
    day: 6,
    index: 207
  },
  {
    level: 1,
    numContributions: 9,
    date: 'August 13th',
    month: 7,
    day: 13,
    index: 208
  },
  {
    level: 2,
    numContributions: 27,
    date: 'August 20th',
    month: 7,
    day: 20,
    index: 209
  },
  {
    level: 1,
    numContributions: 6,
    date: 'August 27th',
    month: 7,
    day: 27,
    index: 210
  },
  {
    level: 1,
    numContributions: 1,
    date: 'September 5th',
    month: 8,
    day: 5,
    index: 212
  },
  {
    level: 2,
    numContributions: 18,
    date: 'September 12th',
    month: 8,
    day: 12,
    index: 213
  },
  {
    level: 1,
    numContributions: 5,
    date: 'September 19th',
    month: 8,
    day: 19,
    index: 214
  },
  {
    level: 1,
    numContributions: 7,
    date: 'September 26th',
    month: 8,
    day: 26,
    index: 215
  },
  {
    level: 1,
    numContributions: 8,
    date: 'October 3rd',
    month: 9,
    day: 3,
    index: 216
  },
  {
    level: 1,
    numContributions: 8,
    date: 'October 10th',
    month: 9,
    day: 10,
    index: 217
  },
  {
    level: 1,
    numContributions: 9,
    date: 'October 17th',
    month: 9,
    day: 17,
    index: 218
  },
  {
    level: 1,
    numContributions: 9,
    date: 'October 24th',
    month: 9,
    day: 24,
    index: 219
  },
  {
    level: 3,
    numContributions: 37,
    date: 'October 31st',
    month: 9,
    day: 31,
    index: 220
  },
  {
    level: 4,
    numContributions: 54,
    date: 'November 7th',
    month: 10,
    day: 7,
    index: 221
  },
  {
    level: 1,
    numContributions: 14,
    date: 'November 14th',
    month: 10,
    day: 14,
    index: 222
  },
  {
    level: 3,
    numContributions: 39,
    date: 'November 21st',
    month: 10,
    day: 21,
    index: 223
  },
  {
    level: 2,
    numContributions: 20,
    date: 'November 28th',
    month: 10,
    day: 28,
    index: 224
  },
  {
    level: 1,
    numContributions: 2,
    date: 'December 5th',
    month: 11,
    day: 5,
    index: 225
  },
  {
    level: 1,
    numContributions: 15,
    date: 'December 12th',
    month: 11,
    day: 12,
    index: 226
  },
  {
    level: 1,
    numContributions: 12,
    date: 'December 19th',
    month: 11,
    day: 19,
    index: 227
  },
  {
    level: 2,
    numContributions: 18,
    date: 'December 26th',
    month: 11,
    day: 26,
    index: 228
  },
  {
    level: 2,
    numContributions: 29,
    date: 'January 2nd',
    month: 0,
    day: 2,
    index: 229
  },
  {
    level: 2,
    numContributions: 25,
    date: 'January 9th',
    month: 0,
    day: 9,
    index: 230
  },
  {
    level: 1,
    numContributions: 3,
    date: 'January 16th',
    month: 0,
    day: 16,
    index: 231
  },
  {
    level: 0,
    numContributions: 0,
    date: 'January 23rd',
    month: 0,
    day: 23,
    index: 232
  },
  {
    level: 1,
    numContributions: 11,
    date: 'January 30th',
    month: 0,
    day: 30,
    index: 233
  },
  {
    level: 2,
    numContributions: 19,
    date: 'February 6th',
    month: 1,
    day: 6,
    index: 234
  },
  {
    level: 1,
    numContributions: 14,
    date: 'February 13th',
    month: 1,
    day: 13,
    index: 235
  },
  {
    level: 1,
    numContributions: 4,
    date: 'February 20th',
    month: 1,
    day: 20,
    index: 236
  },
  {
    level: 1,
    numContributions: 3,
    date: 'February 27th',
    month: 1,
    day: 27,
    index: 237
  },
  {
    level: 1,
    numContributions: 10,
    date: 'March 6th',
    month: 2,
    day: 6,
    index: 238
  },
  {
    level: 0,
    numContributions: 0,
    date: 'March 13th',
    month: 2,
    day: 13,
    index: 239
  },
  {
    level: 3,
    numContributions: 38,
    date: 'March 20th',
    month: 2,
    day: 20,
    index: 240
  },
  {
    level: 1,
    numContributions: 1,
    date: 'March 27th',
    month: 2,
    day: 27,
    index: 241
  },
  {
    level: 2,
    numContributions: 24,
    date: 'April 3rd',
    month: 3,
    day: 3,
    index: 242
  },
  {
    level: 2,
    numContributions: 25,
    date: 'April 10th',
    month: 3,
    day: 10,
    index: 243
  },
  {
    level: 1,
    numContributions: 1,
    date: 'April 17th',
    month: 3,
    day: 17,
    index: 244
  },
  {
    level: 1,
    numContributions: 8,
    date: 'April 24th',
    month: 3,
    day: 24,
    index: 245
  },
  {
    level: 1,
    numContributions: 4,
    date: 'May 1st',
    month: 4,
    day: 1,
    index: 246
  },
  {
    level: 0,
    numContributions: 0,
    date: 'May 8th',
    month: 4,
    day: 8,
    index: 247
  },
  {
    level: 1,
    numContributions: 11,
    date: 'May 15th',
    month: 4,
    day: 15,
    index: 248
  },
  {
    level: 1,
    numContributions: 4,
    date: 'May 22nd',
    month: 4,
    day: 22,
    index: 249
  },
  {
    level: 1,
    numContributions: 11,
    date: 'May 29th',
    month: 4,
    day: 29,
    index: 250
  },
  {
    level: 3,
    numContributions: 44,
    date: 'June 5th',
    month: 5,
    day: 5,
    index: 251
  },
  {
    level: 3,
    numContributions: 39,
    date: 'June 12th',
    month: 5,
    day: 12,
    index: 252
  },
  {
    level: 1,
    numContributions: 12,
    date: 'June 19th',
    month: 5,
    day: 19,
    index: 253
  },
  {
    level: 1,
    numContributions: 6,
    date: 'June 26th',
    month: 5,
    day: 26,
    index: 254
  },
  {
    level: 1,
    numContributions: 12,
    date: 'July 3rd',
    month: 6,
    day: 3,
    index: 255
  },
  {
    level: 0,
    numContributions: 0,
    date: 'July 10th',
    month: 6,
    day: 10,
    index: 256
  },
  {
    level: 1,
    numContributions: 13,
    date: 'July 17th',
    month: 6,
    day: 17,
    index: 257
  },
  {
    level: 1,
    numContributions: 4,
    date: 'July 24th',
    month: 6,
    day: 24,
    index: 258
  },
  {
    level: 1,
    numContributions: 14,
    date: 'July 31st',
    month: 6,
    day: 31,
    index: 259
  },
  {
    level: 1,
    numContributions: 10,
    date: 'August 7th',
    month: 7,
    day: 7,
    index: 260
  },
  {
    level: 1,
    numContributions: 9,
    date: 'August 14th',
    month: 7,
    day: 14,
    index: 261
  },
  {
    level: 0,
    numContributions: 0,
    date: 'August 21st',
    month: 7,
    day: 21,
    index: 262
  },
  {
    level: 1,
    numContributions: 4,
    date: 'August 28th',
    month: 7,
    day: 28,
    index: 263
  },
  {
    level: 1,
    numContributions: 6,
    date: 'September 6th',
    month: 8,
    day: 6,
    index: 265
  },
  {
    level: 1,
    numContributions: 12,
    date: 'September 13th',
    month: 8,
    day: 13,
    index: 266
  },
  {
    level: 1,
    numContributions: 2,
    date: 'September 20th',
    month: 8,
    day: 20,
    index: 267
  },
  {
    level: 1,
    numContributions: 2,
    date: 'September 27th',
    month: 8,
    day: 27,
    index: 268
  },
  {
    level: 2,
    numContributions: 23,
    date: 'October 4th',
    month: 9,
    day: 4,
    index: 269
  },
  {
    level: 1,
    numContributions: 2,
    date: 'October 11th',
    month: 9,
    day: 11,
    index: 270
  },
  {
    level: 1,
    numContributions: 1,
    date: 'October 18th',
    month: 9,
    day: 18,
    index: 271
  },
  {
    level: 1,
    numContributions: 6,
    date: 'October 25th',
    month: 9,
    day: 25,
    index: 272
  },
  {
    level: 2,
    numContributions: 21,
    date: 'November 1st',
    month: 10,
    day: 1,
    index: 273
  },
  {
    level: 1,
    numContributions: 7,
    date: 'November 8th',
    month: 10,
    day: 8,
    index: 274
  },
  {
    level: 1,
    numContributions: 8,
    date: 'November 15th',
    month: 10,
    day: 15,
    index: 275
  },
  {
    level: 2,
    numContributions: 28,
    date: 'November 22nd',
    month: 10,
    day: 22,
    index: 276
  },
  {
    level: 1,
    numContributions: 5,
    date: 'November 29th',
    month: 10,
    day: 29,
    index: 277
  },
  {
    level: 2,
    numContributions: 31,
    date: 'December 6th',
    month: 11,
    day: 6,
    index: 278
  },
  {
    level: 1,
    numContributions: 12,
    date: 'December 13th',
    month: 11,
    day: 13,
    index: 279
  },
  {
    level: 1,
    numContributions: 12,
    date: 'December 20th',
    month: 11,
    day: 20,
    index: 280
  },
  {
    level: 1,
    numContributions: 13,
    date: 'December 27th',
    month: 11,
    day: 27,
    index: 281
  },
  {
    level: 2,
    numContributions: 32,
    date: 'January 3rd',
    month: 0,
    day: 3,
    index: 282
  },
  {
    level: 1,
    numContributions: 11,
    date: 'January 10th',
    month: 0,
    day: 10,
    index: 283
  },
  {
    level: 1,
    numContributions: 10,
    date: 'January 17th',
    month: 0,
    day: 17,
    index: 284
  },
  {
    level: 1,
    numContributions: 1,
    date: 'January 24th',
    month: 0,
    day: 24,
    index: 285
  },
  {
    level: 1,
    numContributions: 9,
    date: 'January 31st',
    month: 0,
    day: 31,
    index: 286
  },
  {
    level: 2,
    numContributions: 17,
    date: 'February 7th',
    month: 1,
    day: 7,
    index: 287
  },
  {
    level: 1,
    numContributions: 14,
    date: 'February 14th',
    month: 1,
    day: 14,
    index: 288
  },
  {
    level: 2,
    numContributions: 23,
    date: 'February 21st',
    month: 1,
    day: 21,
    index: 289
  },
  {
    level: 2,
    numContributions: 30,
    date: 'February 28th',
    month: 1,
    day: 28,
    index: 290
  },
  {
    level: 2,
    numContributions: 30,
    date: 'March 7th',
    month: 2,
    day: 7,
    index: 291
  },
  {
    level: 4,
    numContributions: 49,
    date: 'March 14th',
    month: 2,
    day: 14,
    index: 292
  },
  {
    level: 0,
    numContributions: 0,
    date: 'March 21st',
    month: 2,
    day: 21,
    index: 293
  },
  {
    level: 1,
    numContributions: 4,
    date: 'March 28th',
    month: 2,
    day: 28,
    index: 294
  },
  {
    level: 1,
    numContributions: 12,
    date: 'April 4th',
    month: 3,
    day: 4,
    index: 295
  },
  {
    level: 1,
    numContributions: 3,
    date: 'April 11th',
    month: 3,
    day: 11,
    index: 296
  },
  {
    level: 0,
    numContributions: 0,
    date: 'April 18th',
    month: 3,
    day: 18,
    index: 297
  },
  {
    level: 1,
    numContributions: 13,
    date: 'April 25th',
    month: 3,
    day: 25,
    index: 298
  },
  {
    level: 1,
    numContributions: 2,
    date: 'May 2nd',
    month: 4,
    day: 2,
    index: 299
  },
  {
    level: 0,
    numContributions: 0,
    date: 'May 9th',
    month: 4,
    day: 9,
    index: 300
  },
  {
    level: 1,
    numContributions: 2,
    date: 'May 16th',
    month: 4,
    day: 16,
    index: 301
  },
  {
    level: 1,
    numContributions: 16,
    date: 'May 23rd',
    month: 4,
    day: 23,
    index: 302
  },
  {
    level: 2,
    numContributions: 17,
    date: 'May 30th',
    month: 4,
    day: 30,
    index: 303
  },
  {
    level: 4,
    numContributions: 59,
    date: 'June 6th',
    month: 5,
    day: 6,
    index: 304
  },
  {
    level: 2,
    numContributions: 28,
    date: 'June 13th',
    month: 5,
    day: 13,
    index: 305
  },
  {
    level: 1,
    numContributions: 12,
    date: 'June 20th',
    month: 5,
    day: 20,
    index: 306
  },
  {
    level: 2,
    numContributions: 29,
    date: 'June 27th',
    month: 5,
    day: 27,
    index: 307
  },
  {
    level: 1,
    numContributions: 8,
    date: 'July 4th',
    month: 6,
    day: 4,
    index: 308
  },
  {
    level: 3,
    numContributions: 43,
    date: 'July 11th',
    month: 6,
    day: 11,
    index: 309
  },
  {
    level: 3,
    numContributions: 40,
    date: 'July 18th',
    month: 6,
    day: 18,
    index: 310
  },
  {
    level: 1,
    numContributions: 11,
    date: 'July 25th',
    month: 6,
    day: 25,
    index: 311
  },
  {
    level: 1,
    numContributions: 4,
    date: 'August 1st',
    month: 7,
    day: 1,
    index: 312
  },
  {
    level: 1,
    numContributions: 12,
    date: 'August 8th',
    month: 7,
    day: 8,
    index: 313
  },
  {
    level: 2,
    numContributions: 23,
    date: 'August 15th',
    month: 7,
    day: 15,
    index: 314
  },
  {
    level: 1,
    numContributions: 1,
    date: 'August 22nd',
    month: 7,
    day: 22,
    index: 315
  },
  {
    level: 1,
    numContributions: 1,
    date: 'August 29th',
    month: 7,
    day: 29,
    index: 316
  },
  {
    level: 1,
    numContributions: 2,
    date: 'September 7th',
    month: 8,
    day: 7,
    index: 318
  },
  {
    level: 2,
    numContributions: 24,
    date: 'September 14th',
    month: 8,
    day: 14,
    index: 319
  },
  {
    level: 0,
    numContributions: 0,
    date: 'September 21st',
    month: 8,
    day: 21,
    index: 320
  },
  {
    level: 1,
    numContributions: 11,
    date: 'September 28th',
    month: 8,
    day: 28,
    index: 321
  },
  {
    level: 1,
    numContributions: 11,
    date: 'October 5th',
    month: 9,
    day: 5,
    index: 322
  },
  {
    level: 1,
    numContributions: 13,
    date: 'October 12th',
    month: 9,
    day: 12,
    index: 323
  },
  {
    level: 1,
    numContributions: 3,
    date: 'October 19th',
    month: 9,
    day: 19,
    index: 324
  },
  {
    level: 1,
    numContributions: 8,
    date: 'October 26th',
    month: 9,
    day: 26,
    index: 325
  },
  {
    level: 1,
    numContributions: 7,
    date: 'November 2nd',
    month: 10,
    day: 2,
    index: 326
  },
  {
    level: 2,
    numContributions: 28,
    date: 'November 9th',
    month: 10,
    day: 9,
    index: 327
  },
  {
    level: 2,
    numContributions: 19,
    date: 'November 16th',
    month: 10,
    day: 16,
    index: 328
  },
  {
    level: 2,
    numContributions: 22,
    date: 'November 23rd',
    month: 10,
    day: 23,
    index: 329
  },
  {
    level: 2,
    numContributions: 19,
    date: 'November 30th',
    month: 10,
    day: 30,
    index: 330
  },
  {
    level: 1,
    numContributions: 11,
    date: 'December 7th',
    month: 11,
    day: 7,
    index: 331
  },
  {
    level: 1,
    numContributions: 6,
    date: 'December 14th',
    month: 11,
    day: 14,
    index: 332
  },
  {
    level: 1,
    numContributions: 9,
    date: 'December 21st',
    month: 11,
    day: 21,
    index: 333
  },
  {
    level: 2,
    numContributions: 27,
    date: 'December 28th',
    month: 11,
    day: 28,
    index: 334
  },
  {
    level: 4,
    numContributions: 55,
    date: 'January 4th',
    month: 0,
    day: 4,
    index: 335
  },
  {
    level: 1,
    numContributions: 8,
    date: 'January 11th',
    month: 0,
    day: 11,
    index: 336
  },
  {
    level: 1,
    numContributions: 14,
    date: 'January 18th',
    month: 0,
    day: 18,
    index: 337
  },
  {
    level: 1,
    numContributions: 12,
    date: 'January 25th',
    month: 0,
    day: 25,
    index: 338
  },
  {
    level: 1,
    numContributions: 3,
    date: 'February 1st',
    month: 1,
    day: 1,
    index: 339
  },
  {
    level: 3,
    numContributions: 33,
    date: 'February 8th',
    month: 1,
    day: 8,
    index: 340
  },
  {
    level: 1,
    numContributions: 12,
    date: 'February 15th',
    month: 1,
    day: 15,
    index: 341
  },
  {
    level: 1,
    numContributions: 9,
    date: 'February 22nd',
    month: 1,
    day: 22,
    index: 342
  },
  {
    level: 1,
    numContributions: 13,
    date: 'March 1st',
    month: 2,
    day: 1,
    index: 343
  },
  {
    level: 3,
    numContributions: 35,
    date: 'March 8th',
    month: 2,
    day: 8,
    index: 344
  },
  {
    level: 1,
    numContributions: 2,
    date: 'March 15th',
    month: 2,
    day: 15,
    index: 345
  },
  {
    level: 1,
    numContributions: 3,
    date: 'March 22nd',
    month: 2,
    day: 22,
    index: 346
  },
  {
    level: 1,
    numContributions: 3,
    date: 'March 29th',
    month: 2,
    day: 29,
    index: 347
  },
  {
    level: 1,
    numContributions: 3,
    date: 'April 5th',
    month: 3,
    day: 5,
    index: 348
  },
  {
    level: 1,
    numContributions: 3,
    date: 'April 12th',
    month: 3,
    day: 12,
    index: 349
  },
  {
    level: 0,
    numContributions: 0,
    date: 'April 19th',
    month: 3,
    day: 19,
    index: 350
  },
  {
    level: 1,
    numContributions: 7,
    date: 'April 26th',
    month: 3,
    day: 26,
    index: 351
  },
  {
    level: 0,
    numContributions: 0,
    date: 'May 3rd',
    month: 4,
    day: 3,
    index: 352
  },
  {
    level: 0,
    numContributions: 0,
    date: 'May 10th',
    month: 4,
    day: 10,
    index: 353
  },
  {
    level: 1,
    numContributions: 4,
    date: 'May 17th',
    month: 4,
    day: 17,
    index: 354
  },
  {
    level: 2,
    numContributions: 24,
    date: 'May 24th',
    month: 4,
    day: 24,
    index: 355
  },
  {
    level: 2,
    numContributions: 17,
    date: 'May 31st',
    month: 4,
    day: 31,
    index: 356
  },
  {
    level: 1,
    numContributions: 15,
    date: 'June 7th',
    month: 5,
    day: 7,
    index: 357
  },
  {
    level: 3,
    numContributions: 38,
    date: 'June 14th',
    month: 5,
    day: 14,
    index: 358
  },
  {
    level: 0,
    numContributions: 0,
    date: 'June 21st',
    month: 5,
    day: 21,
    index: 359
  },
  {
    level: 4,
    numContributions: 62,
    date: 'June 28th',
    month: 5,
    day: 28,
    index: 360
  },
  {
    level: 1,
    numContributions: 2,
    date: 'July 5th',
    month: 6,
    day: 5,
    index: 361
  },
  {
    level: 1,
    numContributions: 12,
    date: 'July 12th',
    month: 6,
    day: 12,
    index: 362
  },
  {
    level: 1,
    numContributions: 10,
    date: 'July 19th',
    month: 6,
    day: 19,
    index: 363
  },
  {
    level: 0,
    numContributions: 0,
    date: 'July 26th',
    month: 6,
    day: 26,
    index: 364
  },
  {
    level: 1,
    numContributions: 1,
    date: 'August 2nd',
    month: 7,
    day: 2,
    index: 365
  },
  {
    level: 1,
    numContributions: 9,
    date: 'August 9th',
    month: 7,
    day: 9,
    index: 366
  },
  {
    level: 2,
    numContributions: 18,
    date: 'August 16th',
    month: 7,
    day: 16,
    index: 367
  },
  {
    level: 0,
    numContributions: 0,
    date: 'August 23rd',
    month: 7,
    day: 23,
    index: 368
  },
  {
    level: 0,
    numContributions: 0,
    date: 'August 30th',
    month: 7,
    day: 30,
    index: 369
  }
]

for (const day of daysRaw) {
  delete day.index
  delete day.month
  delete day.day
}

const days: any[][] = Array.from({ length: 7 }).map(() => [])
for (let i = 0; i < 52; ++i) {
  days[0]!.push(daysRaw[0 * 52 + i]!)
  days[1]!.push(daysRaw[1 * 52 + i]!)
  days[2]!.push(daysRaw[2 * 52 + i]!)
  days[3]!.push(daysRaw[3 * 52 + i]!)
  days[4]!.push(daysRaw[4 * 52 + i]!)
  days[5]!.push(daysRaw[5 * 52 + i]!)
  days[6]!.push(daysRaw[6 * 52 + i]!)
}

// let days = daysRaw.sort((a, b) => {
//   if (a.month === b.month) {
//     return a.day - b.day
//   }

//   return a.month - b.month
// })

// const offsetIndex = days.findIndex((d) => d.index === 0)
// if (offsetIndex > 0) {
//   days = days.slice(offsetIndex).concat(days.slice(0, offsetIndex))
// }

console.log(JSON.stringify(days, null, 2))
