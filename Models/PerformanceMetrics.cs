using System.Diagnostics;

namespace FitnessApp.Models
{
    public class PerformanceMetrics
    {
        public string Operation { get; set; } = string.Empty;
        public long ElapsedMilliseconds { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public string? UserId { get; set; }
        public bool Success { get; set; }
        public string? ErrorMessage { get; set; }
    }

    public static class PerformanceTracker
    {
        private static readonly List<PerformanceMetrics> _metrics = new();
        private static readonly object _lock = new();

        public static void RecordMetric(string operation, long elapsedMs, bool success = true, 
            string? userId = null, string? errorMessage = null)
        {
            lock (_lock)
            {
                _metrics.Add(new PerformanceMetrics
                {
                    Operation = operation,
                    ElapsedMilliseconds = elapsedMs,
                    Success = success,
                    UserId = userId,
                    ErrorMessage = errorMessage
                });

                // Keep only last 1000 metrics to prevent memory issues
                if (_metrics.Count > 1000)
                {
                    _metrics.RemoveRange(0, 100);
                }
            }
        }

        public static IEnumerable<PerformanceMetrics> GetMetrics(int count = 100)
        {
            lock (_lock)
            {
                return _metrics.TakeLast(count).ToList();
            }
        }

        public static double GetAverageResponseTime(string operation)
        {
            lock (_lock)
            {
                var operationMetrics = _metrics.Where(m => m.Operation == operation && m.Success).ToList();
                return operationMetrics.Any() ? operationMetrics.Average(m => m.ElapsedMilliseconds) : 0;
            }
        }

        public static void ClearMetrics()
        {
            lock (_lock)
            {
                _metrics.Clear();
            }
        }
    }

    public class PerformanceStopwatch : IDisposable
    {
        private readonly Stopwatch _stopwatch;
        private readonly string _operation;
        private readonly string? _userId;

        public PerformanceStopwatch(string operation, string? userId = null)
        {
            _operation = operation;
            _userId = userId;
            _stopwatch = Stopwatch.StartNew();
        }

        public void Dispose()
        {
            _stopwatch.Stop();
            PerformanceTracker.RecordMetric(_operation, _stopwatch.ElapsedMilliseconds, true, _userId);
        }

        public void RecordError(string errorMessage)
        {
            _stopwatch.Stop();
            PerformanceTracker.RecordMetric(_operation, _stopwatch.ElapsedMilliseconds, false, _userId, errorMessage);
        }
    }
}