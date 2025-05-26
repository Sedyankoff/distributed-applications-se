using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PulsePoint.Identity.DTO;

public class UpdateProfileDTO
{
    public string? Username { get; set; }
    public string? Password { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string? Gender { get; set; }
    public int? Height { get; set; }
    public int? Weight { get; set; }
}