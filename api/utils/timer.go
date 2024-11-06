package utils

import (
	"fmt"
	"time"
)

func ConvertTime(d time.Duration) string {
	switch {
	case d < time.Microsecond:
		return fmt.Sprintf("%d ns", d.Nanoseconds())
	case d < time.Millisecond:
		return fmt.Sprintf("%d µs", d.Microseconds())
	case d < time.Second:
		return fmt.Sprintf("%d ms", d.Milliseconds())
	case d < time.Minute:
		return fmt.Sprintf("%d s", int64(d.Seconds()))
	case d < time.Hour:
		return fmt.Sprintf("%d m", int64(d.Minutes()))
	default:
		return fmt.Sprintf("%d h", int64(d.Hours()))
	}
}
