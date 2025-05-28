import { Check, X } from "lucide-react";

type PasswordCriteriaProps = {
  password: string;
};

const PasswordCriteria = ({ password }: PasswordCriteriaProps) => {
  const criteria = [
    { label: "Pelo menos 6 caracteres", met: password.length >= 6 },
    { label: "Contém letra maiúscula", met: /[A-Z]/.test(password) },
    { label: "Contém letra minúscula", met: /[a-z]/.test(password) },
    { label: "Contém um número", met: /\d/.test(password) },
    { label: "Contém caractere especial", met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="mt-2 space-y-1">
      {criteria.map((item) => (
        <div key={item.label} className="flex items-center text-xs">
          {item.met ? (
            <Check className="size-4 text-green-500 mr-2" />
          ) : (
            <X className="size-4 text-slate-500 mr-2" />
          )}
          <span className={item.met ? "text-green-500" : "text-slate-400"}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

type PasswordStrengthMeterProps = {
  password: string;
};

export const PasswordStrengthMeter = ({
  password,
}: PasswordStrengthMeterProps) => {
  const getStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/\d/)) strength++;
    if (pass.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };

  const strength = getStrength(password);

  const getColor = (strength: number) => {
    if (strength === 0) return "bg-red-500";
    if (strength === 1) return "bg-red-400";
    if (strength === 2) return "bg-yellow-500";
    if (strength === 3) return "bg-yellow-400";
    return "bg-green-500";
  };

  const getStrengthText = (strength: number) => {
    if (strength === 0) return "Muito fraca";
    if (strength === 1) return "Fraca";
    if (strength === 2) return "Razoável";
    if (strength === 3) return "Boa";
    return "Forte";
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-slate-400 mb-2">Força da senha</span>
        <span className="text-xs text-slate-400 mb-2">
          {getStrengthText(strength)}
        </span>
      </div>

      <div className="flex space-x-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${
              index < strength ? getColor(strength) : "bg-slate-600"
            }`}
          />
        ))}
      </div>

      <PasswordCriteria password={password}/>
    </div>
  );
};
